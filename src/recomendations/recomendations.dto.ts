import { IsUUID } from 'class-validator';

export class RecommendationRequestDto {
  @IsUUID()
  userId: string;

  @IsUUID()
  relationshipId: string;

  occasion?: string;
  budget?: string;
}

export class GiftItem {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  rating: number;
  matchScore: number;
  matchReasons: string[];
  purchaseLinks: string[];
}

export class GiftRecommendationResponseDto {
  recommendations: GiftItem[];
}
