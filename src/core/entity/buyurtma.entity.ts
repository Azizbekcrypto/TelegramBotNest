import { Column, Entity } from 'typeorm';
import { BaseEntity } from './base.entity';

// 7-dars: buyurtmalar alohida jadvalda — bot qayta ishga tushsa ham tarix turadi
@Entity('buyurtmalar')
export class Buyurtma extends BaseEntity {
  @Column({ name: 'telegram_id', type: 'bigint' })
  telegram_id: string;

  @Column({ type: 'varchar' })
  pitsa: string;

  @Column({ type: 'varchar' })
  manzil: string;
}
