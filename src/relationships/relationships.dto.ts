// create-user-relationship.dto.ts
export class CreateUserRelationshipDto {
  readonly user_id: string;
  readonly name: string;
  readonly relationship_type: string;
  readonly birthdate?: Date;
  readonly anniversary?: Date;
}

// update-user-relationship.dto.ts
export class UpdateUserRelationshipDto {
  readonly name?: string;
  readonly relationship_type?: string;
  readonly birthdate?: Date;
  readonly anniversary?: Date;
}
