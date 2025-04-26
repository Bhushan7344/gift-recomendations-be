// recommendations/gemini.service.ts
import { Injectable } from '@nestjs/common';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { GEMINI_API_KEY } from '../../constants';

@Injectable()
export class GeminiService {
  private genAI: GoogleGenerativeAI;
  private model: any;

  constructor() {
    const apiKey = GEMINI_API_KEY;

    if (!apiKey) {
      throw new Error('GEMINI_API_KEY is not defined in environment variables');
    }

    // ✅ Initialize genAI
    this.genAI = new GoogleGenerativeAI(apiKey);

    // ✅ Use correct model name with prefix
    this.model = this.genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });
  }

  async generateGiftRecommendations(data: any): Promise<any> {
    try {
      const prompt = `
      You are a gift recommendation expert. Your goal is to suggest personalized gifts based on the details of the gift giver and recipient.
      
      Gift Giver Info:
      - Gender: ${data.giver.gender}
      - Interests: ${data.giver.interests.join(', ')}
      - Gift preferences: ${data.giver.giftPreferences.join(', ')}
      
      Gift Recipient Info:
      - Name: ${data.recipient.name}
      - Relationship: ${data.recipient.relationshipType}
      - Age: ${data.recipient.age}
      - Gender: ${data.recipient.gender}
      - Interests: ${data.recipient.interests.join(', ')}
      - Favorite categories: ${data.recipient.favoriteCategories.join(', ')}
      - Price range: ${data.recipient.priceRange}
      - Dislikes: ${data.recipient.dislikes.join(', ')}
      - Notes: ${data.recipient.notes}
      
      Request Context:
      - Occasion: ${data.requestContext.occasion}
      - Budget: ${data.requestContext.budget}
      - Special notes: ${data.requestContext.specialNotes || 'None'}
      
      Based on this information, provide 5 specific gift recommendations. Format your response as a valid JSON array with each gift having the following structure:
      {
        "id": [unique number],
        "name": [gift name],
        "description": [short description],
        "price": [estimated price as number],
        "image": [an actual image path from either lorem-picsum or unsplash],
        "category": [gift category],
        "rating": [estimated rating between 1-5],
        "matchScore": [how well it matches the recipient, from 1-100],
        "matchReasons": [array of strings explaining why this gift matches],
        "purchaseLinks": [array of actual URLs from amazon, flipkart or any well known online merchants in India]
      }
      
      Respond ONLY with the valid JSON array and nothing else.
      `;

      const result = await this.model.generateContent(prompt);
      const response = result.response;
      const text = response.text();

      // Parse JSON from the response
      const jsonStart = text.indexOf('[');
      const jsonEnd = text.lastIndexOf(']') + 1;
      const jsonStr = text.substring(jsonStart, jsonEnd);

      return JSON.parse(jsonStr);
    } catch (error) {
      console.error('Error calling Gemini API:', error);
      throw error;
    }
  }
}
