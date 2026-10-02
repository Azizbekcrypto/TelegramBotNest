import { Column, Entity } from 'typeorm';
import { BaseEntity } from './base.entity';

// 4-dars: users jadvali — kim yozdi, ismi nima, suhbat qaysi holatda
@Entity('users')
export class User extends BaseEntity {
  @Column({ name: 'telegram_id', type: 'bigint', unique: true })
  telegram_id: string;

  @Column({ type: 'varchar', nullable: true })
  ism: string | null;

  @Column({ type: 'varchar', default: 'yangi' })
  holat: string; // 'yangi' → 'ism_kutilmoqda' → 'tayyor'
}
