import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { IsNotEmpty, IsEmail, IsString, Length } from 'class-validator';
import { Campaign } from './campaign';
import { SendingList } from './sendingList';
import { Contact } from './contact';
import { Message } from './message';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  @IsNotEmpty({ message: "O e-mail é obrigatório." })
  @IsEmail({}, { message: "O e-mail deve ser válido." })
  email: string;

  @Column()
  @IsNotEmpty({ message: "A senha é obrigatória." })
  @Length(6, 100, { message: "A senha deve ter no mínimo 6 caracteres." })
  password: string;

  @Column()
  @IsNotEmpty({ message: "O nome é obrigatório." })
  @IsString({ message: "O nome deve ser uma string válida." })
  name: string;

  @Column({ default: 'user' })
  @IsIn(['user', 'admin'], { message: "O papel deve ser 'user' ou 'admin'." })
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
