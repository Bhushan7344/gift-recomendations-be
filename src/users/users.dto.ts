// create-user.dto.ts
export class CreateUserDto {
  readonly email: string;
  readonly password: string;
  readonly full_name: string;
}

// update-user.dto.ts
export class UpdateUserDto {
  readonly email?: string;
  readonly password?: string;
  readonly full_name?: string;
}
