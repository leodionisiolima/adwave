import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, ManyToMany, JoinTable, OneToMany } from 'typeorm';
import { IsNotEmpty, IsString, IsDate } from 'class-validator';
import { User } from './user';
import { SendingList } from './sendingList';
import { Message } from './message';

@Entity()
export class Campaign {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  @IsNotEmpty({ message: "O nome da campanha é obrigatório." })
  @IsString({ message: "O nome deve ser uma string válida." })
  name: string;

  @OneToMany(() => Message, (message) => message.campaign)
  messages: Message[];

  @ManyToMany(() => SendingList)
  @JoinTable()
  sendingLists: SendingList[];

  @ManyToOne(() => User, (user) => user.campaigns)
  user: User;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  @IsDate({ message: "A data de criação deve ser uma data válida." })
  createdAt: Date;
}
