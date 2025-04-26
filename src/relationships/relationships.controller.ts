import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { RelationshipsService } from './relationships.service';
import { CreateUserRelationshipDto } from './relationships.dto';

@Controller('relationships')
export class RelationshipsController {
  constructor(private readonly relationshipsService: RelationshipsService) {}

  @Post()
  create(@Body() createUserRelationshipDto: CreateUserRelationshipDto) {
    return this.relationshipsService.create(createUserRelationshipDto);
  }

  @Get(':userId')
  findAll(@Param('userId') userId: string) {
    return this.relationshipsService.findAll(userId);
  }

  @Get(':userId/:id')
  findOne(@Param('userId') userId: string, @Param('id') id: string) {
    return this.relationshipsService.findOne(userId, id);
  }

  @Delete('/:id')
  remove(@Param('id') id: string) {
    return this.relationshipsService.remove(id);
  }
}
