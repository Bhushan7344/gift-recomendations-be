// recommendations/recommendations.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  GiftRecommendationResponseDto,
  RecommendationRequestDto,
} from './recomendations.dto';
import { User } from 'src/users/users.entity';
import { UserRelationships } from 'src/relationships/user-relationships.entity';
import { UserRelationshipPreferences } from 'src/relate-preferences/user-relationship-preferences.entity';
import { GeminiService } from './gemini.service';

@Injectable()
export class RecommendationsService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    @InjectRepository(UserRelationships)
    private relationshipsRepository: Repository<UserRelationships>,
    @InjectRepository(UserRelationshipPreferences)
    private preferencesRepository: Repository<UserRelationshipPreferences>,
    private geminiService: GeminiService,
  ) {}

  async getGiftRecommendations(
    requestDto: RecommendationRequestDto,
  ): Promise<GiftRecommendationResponseDto> {
    // Get user data
    const user = await this.usersRepository.findOne({
      where: { id: requestDto.userId },
    });

    if (!user) {
      throw new Error('User not found');
    }

    const relationship = await this.relationshipsRepository.findOne({
      where: {
        id: requestDto.relationshipId,
        user: { id: requestDto.userId },
      },
    });

    if (!relationship) {
      throw new NotFoundException('Relationship not found for this user');
    }

    const preferences = await this.preferencesRepository.findOne({
      where: {
        relationship_id: relationship.id,
      },
    });

    // Prepare data for AI
    const aiRequestData = {
      giver: {
        gender: user.gender,
        interests: user.interests,
        giftPreferences: user.gift_preferences,
      },
      recipient: {
        name: relationship.name,
        relationshipType: relationship.relationship_type,
        age: preferences?.age,
        gender: preferences?.gender,
        interests: preferences?.interests || [],
        favoriteCategories: preferences?.favorite_categories || [],
        priceRange: preferences?.price_range,
        dislikes: preferences?.dislikes || [],
        notes: preferences?.notes,
        specialDates: {
          birthdate: relationship.birthdate,
          anniversary: relationship.anniversary,
        },
      },
      requestContext: {
        occasion: requestDto.occasion || 'general',
        budget: requestDto.budget || preferences?.price_range,
      },
    };

    // Call Gemini service
    const giftItems =
      await this.geminiService.generateGiftRecommendations(aiRequestData);

    return {
      recommendations: giftItems,
    };
  }
}
