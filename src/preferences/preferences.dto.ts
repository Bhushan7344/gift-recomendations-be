// create-user-preferences.dto.ts
export class CreateUserPreferencesDto {
  readonly user_id: string;
  readonly interests: string[];
  readonly favorite_categories: string[];
  readonly age: number;
  readonly gender: string;
}

// update-user-preferences.dto.ts
export class UpdateUserPreferencesDto {
  readonly interests?: string[];
  readonly favorite_categories?: string[];
  readonly age?: number;
  readonly gender?: string;
}
