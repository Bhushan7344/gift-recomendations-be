import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserRelationshipPreferences } from './user-relationship-preferences.entity';
import { CreateUserRelationshipPreferencesDto } from './relate-preferences.dto';

@Injectable()
export class RelatePreferencesService {
  constructor(
    @InjectRepository(UserRelationshipPreferences)
    private readonly preferencesRepository: Repository<UserRelationshipPreferences>,
  ) {}

  create(
    createUserRelationshipPreferencesDto: CreateUserRelationshipPreferencesDto,
  ): Promise<UserRelationshipPreferences> {
    const preference = this.preferencesRepository.create(
      createUserRelationshipPreferencesDto,
    );
    return this.preferencesRepository.save(preference);
  }
  findOne(relationshipId: string): Promise<UserRelationshipPreferences | null> {
    return this.preferencesRepository.findOne({
      where: { relationship_id: relationshipId },
    });
  }

  remove(relationshipId: string): Promise<void> {
    return this.preferencesRepository
      .delete({ relationship_id: relationshipId })
      .then(() => undefined);
  }
}
