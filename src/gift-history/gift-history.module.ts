import { Module } from '@nestjs/common';
import { GiftHistoryService } from './gift-history.service';
import { GiftHistoryController } from './gift-history.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GiftHistory } from './gift-history.entity';

@Module({
  imports: [TypeOrmModule.forFeature([GiftHistory])],
  providers: [GiftHistoryService],
  controllers: [GiftHistoryController],
})
export class GiftHistoryModule {}
