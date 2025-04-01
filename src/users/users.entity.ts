import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  OneToMany,
} from 'typeorm';
import { UserPreferences } from '../preferences/preference.entity';
import { UserRelationships } from '../relationships/user-relationships.entity';
import { GiftHistory } from '../gifts/gift-history.entity';
import { Notification } from '../notifications/notifications.entity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column()
  full_name: string;

  @CreateDateColumn()
  created_at: Date;

  @OneToMany(() => UserPreferences, (preferences) => preferences.user)
  preferences: UserPreferences[];

  @OneToMany(() => UserRelationships, (relationship) => relationship.user)
  relationships: UserRelationships[];

  @OneToMany(() => GiftHistory, (history) => history.user)
  giftHistory: GiftHistory[];

  @OneToMany(() => Notification, (notification) => notification.user)
  notifications: Notification[];
}
