// create-gift.dto.ts
export class CreateGiftDto {
  readonly name: string;
  readonly description: string;
  readonly price: number;
  readonly category: string;
  readonly age_range: string;
  readonly gender: string;
  readonly interest_tags: string[];
}

// update-gift.dto.ts
export class UpdateGiftDto {
  readonly name?: string;
  readonly description?: string;
  readonly price?: number;
  readonly category?: string;
  readonly age_range?: string;
  readonly gender?: string;
  readonly interest_tags?: string[];
}
