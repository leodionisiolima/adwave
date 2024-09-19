// entities/campaign.ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, ManyToMany, JoinTable, OneToMany } from 'typeorm';
import { User } from './user';
import { SendingList } from './sendingList';
import { Message } from './message';

@Entity()
export class Campaign {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @OneToMany(() => Message, (message) => message.campaign)
  messages: Message[];

  @ManyToMany(() => SendingList)
  @JoinTable()
  sendingLists: SendingList[];

  @ManyToOne(() => User, (user) => user.campaigns)
  user: User;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;
}
