import { Body, Controller, Post } from '@nestjs/common';
import { RecommendationsService } from './recomendations.service';
import {
  GiftRecommendationResponseDto,
  RecommendationRequestDto,
} from './recomendations.dto';

@Controller('recommendations')
export class RecommendationsController {
  constructor(
    private readonly recommendationsService: RecommendationsService,
  ) {}

  @Post()
  async getRecommendations(
    @Body() requestDto: RecommendationRequestDto,
  ): Promise<GiftRecommendationResponseDto> {
    return this.recommendationsService.getGiftRecommendations(requestDto);
  }
}
