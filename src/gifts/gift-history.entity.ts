import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  CreateDateColumn,
} from 'typeorm';
import { User } from '../users/users.entity';
import { UserRelationships } from '../relationships/user-relationships.entity';
import { Gift } from './gift.entity';

@Entity('gift_history')
export class GiftHistory {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => User, (user) => user.giftHistory, { onDelete: 'CASCADE' })
  user: User;

  @ManyToOne(() => UserRelationships, { onDelete: 'CASCADE' })
  relationship: UserRelationships;

  @ManyToOne(() => Gift, { onDelete: 'CASCADE' })
  gift: Gift;

  @CreateDateColumn()
  purchase_date: Date;
}
