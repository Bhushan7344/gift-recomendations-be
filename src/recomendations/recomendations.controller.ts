import { Controller, Get, Param } from '@nestjs/common';
import { RecomendationsService } from './recomendations.service';
import { Gift } from 'src/gifts/gift.entity';

@Controller('recomendations')
export class RecomendationsController {
  constructor(private readonly recommendationsService: RecomendationsService) {}

  @Get(':relationshipId')
  async getRecommendations(
    @Param('relationshipId') relationshipId: string,
  ): Promise<Gift[]> {
    return this.recommendationsService.getRecommendations(relationshipId);
  }
}
