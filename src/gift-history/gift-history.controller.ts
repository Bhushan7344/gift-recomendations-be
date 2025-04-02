import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { GiftHistoryService } from './gift-history.service';
import { CreateGiftHistoryDto } from './gift-history.dto';

@Controller('gift-history')
export class GiftHistoryController {
  constructor(private readonly giftHistoryService: GiftHistoryService) {}

  @Post()
  create(@Body() createGiftHistoryDto: CreateGiftHistoryDto) {
    return this.giftHistoryService.create(createGiftHistoryDto);
  }

  @Get()
  findAll() {
    return this.giftHistoryService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.giftHistoryService.findOne(id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.giftHistoryService.remove(id);
  }
}
