// create-user.dto.ts
import { PartialType } from '@nestjs/mapped-types';

export class CreateUserDto {
  readonly email: string;
  readonly password: string;
  readonly full_name: string;
}

// update-user.dto.ts
export class UpdateUserDto extends PartialType(CreateUserDto) {}
