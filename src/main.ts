import { NestFactory } from '@nestjs/core';
import { AppModule } from './api/app.module';
import { config } from './config';

async function main() {
  const app = await NestFactory.create(AppModule);
  // 6-Modul 8-dars: brauzer saytga (localhost:5173) Backend'dan javob olishga ruxsat beradi
  app.enableCors({ origin: 'http://localhost:5173' });
  await app.listen(config.PORT);
  console.log(`Server ${config.PORT}-portda ishlayapti`);
}

void main();
