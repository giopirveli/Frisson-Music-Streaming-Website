import { Music } from 'src/music/entities/music.entity';
import { User } from 'src/users/entities/user.entity';
import {
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('listeners')
export class Listener {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.listeners, { nullable: false })
  user: User;
  
  @ManyToMany(() => Music)
  @JoinTable()
  subscriptions: Music[];
}
