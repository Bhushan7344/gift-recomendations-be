import { Module } from '@nestjs/common';
import { RecommendationsService } from './recomendations.service';
import { RecommendationsController } from './recomendations.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Gift } from 'src/gifts/gift.entity';
import { User } from 'src/users/users.entity';
import { UserRelationships } from 'src/relationships/user-relationships.entity';
import { UserRelationshipPreferences } from 'src/relate-preferences/user-relationship-preferences.entity';
import { GeminiService } from './gemini.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Gift,
      UserRelationshipPreferences,
      User,
      UserRelationships,
    ]),
    ConfigModule,
  ],
  providers: [RecommendationsService, GeminiService],
  controllers: [RecommendationsController],
  exports: [RecommendationsService],
})
export class RecomendationsModule {}
