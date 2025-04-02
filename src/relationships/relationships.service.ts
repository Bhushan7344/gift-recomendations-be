import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserRelationships } from './user-relationships.entity';
import { CreateUserRelationshipDto } from './relationships.dto';

@Injectable()
export class RelationshipsService {
  constructor(
    @InjectRepository(UserRelationships)
    private readonly relationshipsRepository: Repository<UserRelationships>,
  ) {}

  create(
    createUserRelationshipDto: CreateUserRelationshipDto,
  ): Promise<UserRelationships> {
    const relationship = this.relationshipsRepository.create(
      createUserRelationshipDto,
    );
    return this.relationshipsRepository.save(relationship);
  }

  findAll(userId: string): Promise<UserRelationships[]> {
    return this.relationshipsRepository.find({
      where: { user: { id: userId } },
    });
  }

  findOne(userId: string, id: string): Promise<UserRelationships | null> {
    return this.relationshipsRepository.findOne({
      where: { id, user: { id: userId } },
    });
  }

  remove(userId: string, id: string): Promise<void> {
    return this.relationshipsRepository
      .delete({ id, user: { id: userId } })
      .then(() => undefined);
  }
}
