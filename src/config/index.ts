import * as dotenv from 'dotenv';

dotenv.config({ quiet: true });

export const config = {
  PORT: Number(process.env.PORT) || 3000,
  BOT_TOKEN: String(process.env.BOT_TOKEN || ''),
  DATABASE_URL: String(process.env.DATABASE_URL || ''),
  GEMINI_API_KEY: String(process.env.GEMINI_API_KEY || ''),
};
