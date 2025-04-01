import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
} from 'typeorm';
import { User } from '../users/users.entity';

@Entity('user_preferences')
export class UserPreferences {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => User, (user) => user.preferences, { onDelete: 'CASCADE' })
  user: User;

  @Column('json')
  interests: string[];

  @Column('json')
  favorite_categories: string[];

  @Column()
  age: number;

  @Column()
  gender: string;

  @CreateDateColumn()
  created_at: Date;
}
