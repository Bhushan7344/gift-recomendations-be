import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
} from 'typeorm';
import { User } from '../users/users.entity';

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

  @Column()
  notes: string;

  @Column()
  avatar: string;

  @Column()
  email: string;

  @Column()
  phone_number: string;

  @CreateDateColumn()
  created_at: Date;
}
