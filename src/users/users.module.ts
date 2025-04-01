import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users.entity';
import { Gift } from 'src/gifts/gift.entity';
import { GiftHistory } from 'src/gifts/gift-history.entity';
import { Notification } from 'src/notifications/notifications.entity';
import { UserRelationshipPreferences } from 'src/relationships/user-relationship-preferences.entity';
import { UserRelationship } from './user-relationship.entity';
import { UserPreferences } from 'src/preferences/preference.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      User
    ]),
  ],
  providers: [UsersService],
  controllers: [UsersController],
})
export class UsersModule {}
