import { Injectable } from '@nestjs/common';
import { GoogleGenAI } from '@google/genai';
import { config } from '../../config';
import { SYSTEM_PROMPT } from './system-prompt';

// 6-dars: handlerda tayyor javobi yo'q erkin savolga AI javob yozadi
@Injectable()
export class AiService {
  private ai: GoogleGenAI | null = null;

  constructor() {
    if (config.GEMINI_API_KEY)
      this.ai = new GoogleGenAI({ apiKey: config.GEMINI_API_KEY });
  }

  // Kalit bo'lmasa — null: bot «AI hali ulanmagan» deydi, yiqilmaydi
  async javob(savol: string): Promise<string | null> {
    if (!this.ai) return null;
    const res = await this.ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: savol,
      config: { systemInstruction: SYSTEM_PROMPT, temperature: 0.4 },
    });
    return res.text ?? null;
  }
}
