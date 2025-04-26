// users.dto.ts
import { PartialType } from '@nestjs/mapped-types';

export class CreateUserDto {
  readonly email: string;
  readonly password: string;
  readonly username: string;
  readonly full_name?: string;
  readonly gender?: string;
  readonly birthday?: Date;
  readonly interests?: string[];
  readonly gift_preferences?: string[];
  readonly bio?: string;
  readonly avatar_url?: string;
}

// update-user.dto.ts
export class UpdateUserDto extends PartialType(CreateUserDto) {}
