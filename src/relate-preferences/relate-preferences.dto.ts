// create-user-relationship-preferences.dto.ts
export class CreateUserRelationshipPreferencesDto {
  readonly relationship_id: string;
  readonly interests: string[];
  readonly favorite_categories: string[];
  readonly age: number;
  readonly gender: string;
}

// update-user-relationship-preferences.dto.ts
export class UpdateUserRelationshipPreferencesDto {
  readonly interests?: string[];
  readonly favorite_categories?: string[];
  readonly age?: number;
  readonly gender?: string;
}
