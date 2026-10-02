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
}
