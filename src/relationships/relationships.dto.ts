// create-user-relationship.dto.ts
export class CreateUserRelationshipDto {
  readonly user_id: number;
  readonly name: string;
  readonly relationship_type: string;
  readonly birthdate?: Date;
  readonly anniversary?: Date;
  readonly avatar?: string;
  readonly notes?: string;
  readonly email: string;
  readonly phone_number?: string;
}

// update-user-relationship.dto.ts
export class UpdateUserRelationshipDto {
  readonly name?: string;
  readonly relationship_type?: string;
  readonly birthdate?: Date;
  readonly anniversary?: Date;
}
