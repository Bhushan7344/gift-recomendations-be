import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { RelatePreferencesService } from './relate-preferences.service';
import { CreateUserRelationshipPreferencesDto } from './relate-preferences.dto';

@Controller('relate-preferences')
export class RelatePreferencesController {
  constructor(
    private readonly userRelationshipPreferencesService: RelatePreferencesService,
  ) {}

  @Post()
  create(
    @Body()
    createUserRelationshipPreferencesDto: CreateUserRelationshipPreferencesDto,
  ) {
    return this.userRelationshipPreferencesService.create(
      createUserRelationshipPreferencesDto,
    );
  }

  @Get(':relationshipId')
  findOne(@Param('relationshipId') relationshipId: string) {
    return this.userRelationshipPreferencesService.findOne(relationshipId);
  }

  @Delete(':relationshipId')
  remove(@Param('relationshipId') relationshipId: string) {
    return this.userRelationshipPreferencesService.remove(relationshipId);
  }
}
