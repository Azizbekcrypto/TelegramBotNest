import { NestFactory } from '@nestjs/core';
import { AppModule } from './api/app.module';
import { config } from './config';

async function main() {
  const app = await NestFactory.create(AppModule);
  // 6-Modul 8-dars: brauzer saytga (localhost:5173) Backend'dan javob olishga ruxsat beradi.
  // 9-dars: 8081 — Expo ilovasi brauzerda ochilganda (terminalda `w`). Telefonga CORS kerak emas
  app.enableCors({
    origin: ['http://localhost:5173', 'http://localhost:8081'],
  });
  await app.listen(config.PORT);
  console.log(`Server ${config.PORT}-portda ishlayapti`);
}

void main();
