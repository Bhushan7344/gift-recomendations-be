import { Module } from '@nestjs/common';
import { RecomendationsService } from './recomendations.service';
import { RecomendationsController } from './recomendations.controller';
import { UsersModule } from 'src/users/users.module';
import { GiftsModule } from 'src/gifts/gifts.module';

@Module({
  imports: [UsersModule, GiftsModule],
  providers: [RecomendationsService],
  controllers: [RecomendationsController]
})
export class RecomendationsModule {}
