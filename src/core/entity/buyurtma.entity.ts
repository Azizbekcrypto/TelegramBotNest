import { Column, Entity } from 'typeorm';
import { BaseEntity } from './base.entity';

// 7-dars: buyurtmalar alohida jadvalda — bot qayta ishga tushsa ham tarix turadi
@Entity('buyurtmalar')
export class Buyurtma extends BaseEntity {
  // 6-Modul 8-dars: saytdan kelgan buyurtmada Telegram raqami yo'q — bo'sh bo'la oladi
  @Column({ name: 'telegram_id', type: 'bigint', nullable: true })
  telegram_id: string | null;

  @Column({ type: 'varchar' })
  pitsa: string;

  @Column({ type: 'varchar' })
  manzil: string;

  // 6-Modul 8-dars: buyurtma qaysi kirish yo'lidan keldi — 'bot' · 'sayt' · 'mobil' (11-dars). Eski qatorlar — 'bot'
  @Column({ type: 'varchar', default: 'bot' })
  manba: string;
}
