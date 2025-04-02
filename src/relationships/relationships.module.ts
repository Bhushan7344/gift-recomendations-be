import { Module } from '@nestjs/common';
import { RelationshipsService } from './relationships.service';
import { RelationshipsController } from './relationships.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRelationships } from './user-relationships.entity';
import { UserRelationshipPreferences } from '../relate-preferences/user-relationship-preferences.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserRelationships, UserRelationshipPreferences]),
  ],
  providers: [RelationshipsService],
  controllers: [RelationshipsController],
})
export class RelationshipsModule {}
