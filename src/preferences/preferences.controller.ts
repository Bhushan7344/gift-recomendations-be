import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { PreferencesService } from './preferences.service';
import {
  CreateUserPreferencesDto,
  UpdateUserPreferencesDto,
} from './preferences.dto';

@Controller('preferences')
export class PreferencesController {
  constructor(private readonly preferencesService: PreferencesService) {}

  @Post()
  create(@Body() createUserPreferencesDto: CreateUserPreferencesDto) {
    return this.preferencesService.create(createUserPreferencesDto);
  }

  @Get(':userId')
  findOne(@Param('userId') userId: string) {
    return this.preferencesService.findOne(userId);
  }

  @Delete(':userId')
  remove(@Param('userId') userId: string) {
    return this.preferencesService.remove(userId);
  }
}
