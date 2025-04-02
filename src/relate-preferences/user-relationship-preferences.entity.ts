import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
} from 'typeorm';
import { UserRelationships } from '../relationships/user-relationships.entity';

@Entity('user_relationship_preferences')
export class UserRelationshipPreferences {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(
    () => UserRelationships,
    (relationship) => relationship.preferences,
    { onDelete: 'CASCADE' },
  )
  relationship: UserRelationships;

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
