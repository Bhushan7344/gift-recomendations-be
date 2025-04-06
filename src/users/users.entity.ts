import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  OneToMany,
} from 'typeorm';
import { UserRelationships } from '../relationships/user-relationships.entity';
import { GiftHistory } from '../gift-history/gift-history.entity';
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

  @Column()
  gender: string;

  @CreateDateColumn()
  birthday: Date;

  @Column('json')
  interests: string[];

  @Column('json')
  gift_preferences: string[];

  @Column()
  bio: string;

  @Column()
  avatar_url: string;

  @OneToMany(() => UserRelationships, (relationship) => relationship.user)
  relationships: UserRelationships[];

  @OneToMany(() => GiftHistory, (history) => history.user)
  giftHistory: GiftHistory[];

  @OneToMany(() => Notification, (notification) => notification.user)
  notifications: Notification[];
}
