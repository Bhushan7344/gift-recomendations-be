import { Module } from '@nestjs/common';
import { RelatePreferencesService } from './relate-preferences.service';
import { RelatePreferencesController } from './relate-preferences.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRelationshipPreferences } from './user-relationship-preferences.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserRelationshipPreferences])],
  providers: [RelatePreferencesService],
  controllers: [RelatePreferencesController],
})
export class RelatePreferencesModule {}
