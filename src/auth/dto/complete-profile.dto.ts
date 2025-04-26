import {
  IsArray,
  IsDateString,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUrl,
} from 'class-validator';

export class CompleteProfileDto {
  @IsString()
  @IsNotEmpty()
  full_name: string;

  @IsString()
  @IsNotEmpty()
  gender: string;

  @IsDateString()
  @IsNotEmpty()
  birthday: Date;

  @IsArray()
  @IsNotEmpty()
  interests: string[];

  @IsArray()
  @IsNotEmpty()
  gift_preferences: string[];

  @IsString()
  @IsNotEmpty()
  bio: string;

  @IsUrl()
  @IsOptional()
  avatar_url?: string;
}
