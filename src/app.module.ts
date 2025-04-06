import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { GiftsModule } from './gifts/gifts.module';
import { RecomendationsModule } from './recomendations/recomendations.module';
import { NotificationsModule } from './notifications/notifications.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RelationshipsModule } from './relationships/relationships.module';
import { User } from './users/users.entity';
import { Gift } from './gifts/gift.entity';
import { GiftHistory } from './gift-history/gift-history.entity';
import { UserRelationshipPreferences } from './relate-preferences/user-relationship-preferences.entity';
import { UserRelationships } from './relationships/user-relationships.entity';
import { Notification } from './notifications/notifications.entity';
import {
  DATABASE_HOST,
  DATABASE_PORT,
  DATABASE_USERNAME,
  DATABASE_PASSWORD,
  DATABASE_NAME,
} from '../constants';
import { RelatePreferencesModule } from './relate-preferences/relate-preferences.module';
import { GiftHistoryModule } from './gift-history/gift-history.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: DATABASE_HOST,
      port: parseInt(DATABASE_PORT),
      username: DATABASE_USERNAME,
      password: DATABASE_PASSWORD,
      database: DATABASE_NAME,
      entities: [
        User,
        Gift,
        GiftHistory,
        Notification,
        UserRelationshipPreferences,
        UserRelationships,
      ],
      synchronize: true,
    }),
    AuthModule,
    UsersModule,
    GiftsModule,
    RecomendationsModule,
    NotificationsModule,
    RelationshipsModule,
    RelatePreferencesModule,
    GiftHistoryModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
