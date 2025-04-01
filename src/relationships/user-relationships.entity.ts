import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  CreateDateColumn,
} from 'typeorm';
import { User } from '../users/users.entity';
import { UserRelationshipPreferences } from './user-relationship-preferences.entity';

@Entity('user_relationships')
export class UserRelationships {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => User, (user) => user.relationships, { onDelete: 'CASCADE' })
  user: User;

  @Column()
  name: string;

  @Column()
  relationship_type: string;

  @Column({ nullable: true })
  birthdate: Date;

  @Column({ nullable: true })
  anniversary: Date;

  @CreateDateColumn()
  created_at: Date;

  @OneToMany(
    () => UserRelationshipPreferences,
    (preferences) => preferences.relationship,
    { cascade: true },
  )
  preferences: UserRelationshipPreferences[];
}
