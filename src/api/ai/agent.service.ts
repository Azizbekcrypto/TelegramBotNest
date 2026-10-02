import { Injectable } from '@nestjs/common';
import {
  GoogleGenAI,
  Type,
  type Content,
  type FunctionDeclaration,
  type Part,
} from '@google/genai';
import { config } from '../../config';
import { SYSTEM_PROMPT } from './system-prompt';
import { BuyurtmaService } from '../buyurtma/buyurtma.service';
import { PITSALAR, narxi, som } from '../menyu';

// 10-dars: AI-agent — maqsad + chegara + ikki asbob. Keyingi qadamni model tanlaydi, ishni asbob (bizning funksiya) bajaradi.
const MAQSAD = `
MAQSAD: Mijoz buyurtmasini qabul qilib, bazaga yozish.
CHEGARA: Taom borligini checkOrder bilan tekshirmasdan saveOrder chaqirilmasin. Manzil bo'lmasa — so'ra.
Asbob natijasini olgach, mijozga qisqa o'zbekcha javob yoz.`;

const ASBOBLAR: FunctionDeclaration[] = [
  {
    name: 'checkOrder',
    description: 'Taom menyuda bormi — tekshiradi, narxini qaytaradi',
    parameters: {
      type: Type.OBJECT,
      properties: { taom: { type: Type.STRING }, soni: { type: Type.INTEGER } },
      required: ['taom', 'soni'],
    },
  },
  {
    name: 'saveOrder',
    description: "Buyurtmani bazaga yozadi (faqat taom bor bo'lsa)",
    parameters: {
      type: Type.OBJECT,
      properties: {
        taom: { type: Type.STRING },
        soni: { type: Type.INTEGER },
        manzil: { type: Type.STRING },
      },
      required: ['taom', 'soni', 'manzil'],
    },
  },
];

@Injectable()
export class AgentService {
  private ai: GoogleGenAI | null = null;

  constructor(private readonly buyurtmalar: BuyurtmaService) {
    if (config.GEMINI_API_KEY)
      this.ai = new GoogleGenAI({ apiKey: config.GEMINI_API_KEY });
  }

  // Asboblar — model chaqiradi, biz bajaramiz
  private async asbob(
    telegramId: number,
    nom: string,
    args: Record<string, unknown>,
  ) {
    const taom = String(args.taom ?? '');
    const soni = Number(args.soni ?? 1);
    if (nom === 'checkOrder') {
      const narx = narxi(taom);
      const bor = narx > 0;
      console.log(
        `checkOrder → ${taom} × ${soni}: ${bor ? 'bor, ' + som(narx) : "yo'q"}`,
      );
      return {
        bor,
        narx,
        jami: narx * soni,
        menyu: Object.values(PITSALAR).map((p) => p.nom),
      };
    }
    if (nom === 'saveOrder') {
      const manzil = String(args.manzil ?? '');
      if (narxi(taom) === 0)
        return { saqlandi: false, sabab: "taom menyuda yo'q" }; // CHEGARA — kodda ham
      await this.buyurtmalar.yoz(telegramId, `${soni} × ${taom}`, manzil);
      console.log(`saveOrder → ${soni} × ${taom}, ${manzil}: saqlandi`);
      return { saqlandi: true, jami: narxi(taom) * soni };
    }
    return { xato: "bunday asbob yo'q" };
  }

  // Agent sikli: model → asbob → natija modelga → … → matn. Kalit bo'lmasa null.
  async javob(telegramId: number, matn: string): Promise<string | null> {
    if (!this.ai) return null;
    const contents: Content[] = [{ role: 'user', parts: [{ text: matn }] }];
    for (let qadam = 0; qadam < 4; qadam++) {
      const res = await this.ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents,
        config: {
          systemInstruction: SYSTEM_PROMPT + MAQSAD,
          temperature: 0.2,
          tools: [{ functionDeclarations: ASBOBLAR }],
        },
      });
      const calls = res.functionCalls ?? [];
      if (!calls.length) return res.text ?? null;
      const modelContent = res.candidates?.[0]?.content;
      if (modelContent) contents.push(modelContent);
      const natijalar: Part[] = [];
      for (const c of calls) {
        const natija = await this.asbob(
          telegramId,
          c.name ?? '',
          (c.args ?? {}) as Record<string, unknown>,
        );
        natijalar.push({
          functionResponse: { name: c.name ?? '', response: natija },
        });
      }
      contents.push({ role: 'user', parts: natijalar });
    }
    return 'Uzr, buyurtmani tugata olmadim. /menu dan tanlang.';
  }
}
