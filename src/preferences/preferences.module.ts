import { Module } from '@nestjs/common';
import { PreferencesController } from './preferences.controller';
import { PreferencesService } from './preferences.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserPreferences } from './preference.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserPreferences])],
  controllers: [PreferencesController],
  providers: [PreferencesService]
})
export class PreferencesModule {}
