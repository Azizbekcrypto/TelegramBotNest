import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { config } from '../config';

if (!config.DATABASE_URL) {
  throw new Error(
    'DATABASE_URL topilmadi. .env ga Neon bergan URL ni yozing (README, 4-dars).',
  );
}

// 4a-Moduldagi kabi: bitta joyda bazaga ulanamiz, entity'lar o'zi yuklanadi
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: config.DATABASE_URL,
      ssl: config.DATABASE_URL.includes('sslmode=require')
        ? { rejectUnauthorized: false }
        : false,
      autoLoadEntities: true,
      synchronize: true, // jadvallarni entity'dan o'zi yaratadi (o'quv loyiha uchun)
    }),
  ],
})
export class DatabaseModule {}
