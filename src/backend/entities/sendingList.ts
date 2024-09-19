// entities/sendingList.ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable, ManyToOne } from 'typeorm';
import { Contact } from './contact';
import { User } from './user';

@Entity()
export class SendingList {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @ManyToMany(() => Contact)
  @JoinTable()
  contacts: Contact[];

  @ManyToOne(() => User, (user) => user.sendingLists)
  user: User;

  @Column({ default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;
}
