import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserPreferences } from './preference.entity';
import { CreateUserPreferencesDto } from './preferences.dto';
import { Injectable } from '@nestjs/common';

@Injectable()
export class PreferencesService {
  constructor(
    @InjectRepository(UserPreferences)
    private readonly preferencesRepository: Repository<UserPreferences>,
  ) {}

  create(
    createUserPreferencesDto: CreateUserPreferencesDto,
  ): Promise<UserPreferences> {
    const preference = this.preferencesRepository.create(
      createUserPreferencesDto,
    );
    return this.preferencesRepository.save(preference);
  }

  findOne(userId: string): Promise<UserPreferences | null> {
    return this.preferencesRepository.findOne({
      where: { user: { id: userId } },
    });
  }

  remove(userId: string): Promise<void> {
    return this.preferencesRepository
      .delete({ user: { id: userId } })
      .then(() => undefined);
  }
}
