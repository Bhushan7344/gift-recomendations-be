// auth/auth.service.ts
import {
  Injectable,
  UnauthorizedException,
  ConflictException,
  BadRequestException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { RegisterDto } from './dto/register.dto';
import { CompleteProfileDto } from './dto/complete-profile.dto';
import * as bcrypt from 'bcrypt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RefreshToken } from './entities/refresh-token.entity';
import { CreateUserDto, UpdateUserDto } from 'src/users/users.dto';
import { JWT_EXPIRATION, JWT_SECRET } from '../../constants';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    @InjectRepository(RefreshToken)
    private readonly refreshTokenRepository: Repository<RefreshToken>,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    // Find user by email using a custom method we'll add to UsersService
    const user = await this.usersService.findByEmail(email);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const { password: _, ...result } = user;
    return result;
  }

  async register(registerDto: RegisterDto) {
    // Check if user already exists
    const existingUser = await this.usersService.findByEmail(registerDto.email);
    if (existingUser) {
      throw new ConflictException('Email already exists');
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(registerDto.password, 10);

    // Create a minimal user first
    const newUser = await this.usersService.create({
      email: registerDto.email,
      password: hashedPassword,
      username: registerDto.username,
    } as CreateUserDto);

    // Remove password from response
    const { password, ...result } = newUser;

    // Generate tokens
    const tokens = await this.getTokens(newUser.id, newUser.email);
    await this.storeRefreshToken(newUser.id, tokens.refresh_token);

    return {
      user: result,
      ...tokens,
    };
  }

  async login(user: any) {
    const tokens = await this.getTokens(user.id, user.email);
    await this.storeRefreshToken(user.id, tokens.refresh_token);

    return {
      user: {
        id: user.id,
        email: user.email,
        username: user.username,
        isProfileComplete: this.isProfileComplete(user),
      },
      ...tokens,
    };
  }

  async completeProfile(
    userId: string,
    completeProfileDto: CompleteProfileDto,
  ) {
    const user = await this.usersService.findOne(userId);
    if (!user) {
      throw new BadRequestException('User not found');
    }

    // Update user with additional profile details
    // Create an UpdateUserDto with the correct properties from the entity
    const updateDto: UpdateUserDto = {
      full_name: completeProfileDto.full_name,
      gender: completeProfileDto.gender,
      birthday: completeProfileDto.birthday,
      interests: completeProfileDto.interests,
      gift_preferences: completeProfileDto.gift_preferences,
      bio: completeProfileDto.bio,
      avatar_url: completeProfileDto.avatar_url,
    };

    const updatedUser = await this.usersService.update(userId, updateDto);
    if (!updatedUser) {
      throw new BadRequestException('Failed to update user profile');
    }

    // Safe way to handle possible null value
    const { password, ...result } = updatedUser;
    return result;
  }

  async refreshTokens(userId: string, refreshToken: string) {
    const user = await this.usersService.findOne(userId);
    if (!user) {
      throw new UnauthorizedException('Access Denied');
    }

    // Verify the refresh token exists and is valid
    const storedRefreshToken = await this.refreshTokenRepository.findOne({
      where: { userId, token: refreshToken, isRevoked: false },
    });

    if (!storedRefreshToken) {
      throw new UnauthorizedException('Access Denied');
    }

    // Generate new tokens
    const tokens = await this.getTokens(user.id, user.email);

    // Revoke old refresh token and store new one
    await this.refreshTokenRepository.update(storedRefreshToken.id, {
      isRevoked: true,
    });
    await this.storeRefreshToken(user.id, tokens.refresh_token);

    return tokens;
  }

  async logout(userId: string) {
    // Revoke all refresh tokens for the user
    await this.refreshTokenRepository.update(
      { userId, isRevoked: false },
      { isRevoked: true },
    );
    return { message: 'Logout successful' };
  }

  private async getTokens(userId: string, email: string) {
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(
        {
          sub: userId,
          email,
        },
        {
          secret: JWT_SECRET,
          expiresIn: JWT_EXPIRATION,
        },
      ),
      this.jwtService.signAsync(
        {
          sub: userId,
          email,
        },
        {
          secret: JWT_SECRET,
          expiresIn: JWT_EXPIRATION,
        },
      ),
    ]);

    return {
      access_token: accessToken,
      refresh_token: refreshToken,
    };
  }

  private async storeRefreshToken(userId: string, refreshToken: string) {
    const hashedRefreshToken = await bcrypt.hash(refreshToken, 10);
    const newRefreshToken = this.refreshTokenRepository.create({
      userId,
      token: hashedRefreshToken,
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days
      isRevoked: false,
    });
    await this.refreshTokenRepository.save(newRefreshToken);
  }

  private isProfileComplete(user: any): boolean {
    // Check if all required profile fields are completed
    return !!(
      user.full_name &&
      user.gender &&
      user.birthday &&
      user.interests?.length &&
      user.gift_preferences?.length &&
      user.bio
    );
  }
}
