import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../../core/entity/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly repo: Repository<User>,
  ) {}

  // Bor bo'lsa topadi, bo'lmasa yangi qator ochadi
  async topOrYarat(telegramId: number): Promise<User> {
    const id = String(telegramId);
    const bor = await this.repo.findOne({ where: { telegram_id: id } });
    if (bor) return bor;
    return this.repo.save(this.repo.create({ telegram_id: id }));
  }

  async holatQoy(user: User, holat: string): Promise<User> {
    user.holat = holat;
    return this.repo.save(user);
  }

  async ismQoy(user: User, ism: string): Promise<User> {
    user.ism = ism;
    user.holat = 'tayyor';
    return this.repo.save(user);
  }

  // 5-dars: pitsa tanlandi — manzil kutiladi
  async tanlovQoy(user: User, tanlov: string): Promise<User> {
    user.tanlov = tanlov;
    user.manzil = null;
    user.holat = 'manzil_kutilmoqda';
    return this.repo.save(user);
  }

  // 5-dars: manzil keldi — buyurtma tayyor
  async manzilQoy(user: User, manzil: string): Promise<User> {
    user.manzil = manzil;
    user.holat = 'tayyor';
    return this.repo.save(user);
  }
}
