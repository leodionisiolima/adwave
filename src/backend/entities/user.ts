// entities/user.ts
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Campaign } from './campaign';
import { SendingList } from './sendingList';
import { Contact } from './contact';
import { Message } from './message';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column()
  name: string;

  @Column({ default: 'user' }) // admin or user
  role: string;

  @OneToMany(() => Campaign, (campaign) => campaign.user)
  campaigns: Campaign[];

  @OneToMany(() => SendingList, (sendingList) => sendingList.user)
  sendingLists: SendingList[];

  @OneToMany(() => Contact, (contact) => contact.user)
  contacts: Contact[];

  @OneToMany(() => Message, (message) => message.user)
  messages: Message[];

  @Column({ default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;
}
