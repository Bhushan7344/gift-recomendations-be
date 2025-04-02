import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { GiftsService } from './gifts.service';
import { CreateGiftDto } from './gifts.dto';

@Controller('gifts')
export class GiftsController {
  constructor(private readonly giftsService: GiftsService) {}

  @Post()
  create(@Body() createGiftDto: CreateGiftDto) {
    return this.giftsService.create(createGiftDto);
  }

  @Get()
  findAll() {
    return this.giftsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.giftsService.findOne(id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.giftsService.remove(id);
  }
}
