import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from 'typeorm';

@Entity('user_relationship_preferences')
export class UserRelationshipPreferences {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  relationship_id: string; // Just a foreign key to user_relationships

  @Column('json')
  interests: string[];

  @Column('json')
  favorite_categories: string[];

  @Column()
  price_range: string;

  @Column('json')
  dislikes: string[];

  @Column()
  notes: string;

  @Column()
  age: number;

  @Column()
  gender: string;

  @CreateDateColumn()
  created_at: Date;
}
