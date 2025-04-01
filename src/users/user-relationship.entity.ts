import { Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn, Column, CreateDateColumn, DeleteDateColumn } from 'typeorm';
import { User } from 'src/users/users.entity';

@Entity()
export class UserRelationship {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToOne(() => User, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'friend_id' })
  friend: User;

  @Column({ default: 'friend' })  // Can be 'friend', 'family', etc.
  relationshipType: string;

  @CreateDateColumn()
  createdAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;  // Soft delete, if user removes the relationship
}

