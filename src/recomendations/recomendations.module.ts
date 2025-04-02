import { Module } from '@nestjs/common';
import { RecomendationsService } from './recomendations.service';
import { RecomendationsController } from './recomendations.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Gift } from 'src/gifts/gift.entity';
import { UserRelationshipPreferences } from 'src/relate-preferences/user-relationship-preferences.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Gift, UserRelationshipPreferences])],
  providers: [RecomendationsService],
  controllers: [RecomendationsController],
})
export class RecomendationsModule {}
