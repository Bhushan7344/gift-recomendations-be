// recommendations.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Gift } from '../gifts/gift.entity';
import { UserRelationshipPreferences } from '../relate-preferences/user-relationship-preferences.entity';

@Injectable()
export class RecomendationsService {
  constructor(
    @InjectRepository(Gift)
    private readonly giftRepository: Repository<Gift>,

    @InjectRepository(UserRelationshipPreferences)
    private readonly preferencesRepository: Repository<UserRelationshipPreferences>,
  ) {}

  async getRecommendations(relationshipId: string): Promise<Gift[]> {
    // Fetch relationship preferences
    const preferences = await this.preferencesRepository.findOne({
      where: { relationship: { id: relationshipId } },
    });

    if (!preferences) {
      throw new Error('No preferences found for this relationship');
    }

    // Fetch all gifts from the database
    const gifts = await this.giftRepository.find();

    // Compute matching scores
    const scoredGifts = gifts.map((gift) => {
      let score = 0;

      // Extract min and max age from age_range (e.g., "18-22" -> [18, 22])
      const [minAge, maxAge] = gift.age_range.split('-').map(Number);

      // Age range match
      if (preferences.age >= minAge && preferences.age <= maxAge) {
        score += 3;
      }

      // Gender match
      if (gift.gender === preferences.gender) {
        score += 3;
      } else if (gift.gender === 'unisex') {
        score += 2;
      }

      // Interest match
      const matchedInterests = preferences.interests.filter((interest) =>
        gift.interest_tags.includes(interest),
      );
      score += matchedInterests.length * 2;

      return { gift, score };
    });

    // Sort gifts by score (highest first)
    scoredGifts.sort((a, b) => b.score - a.score);

    // Return the top 5 gifts
    return scoredGifts.slice(0, 5).map((item) => item.gift);
  }
}
