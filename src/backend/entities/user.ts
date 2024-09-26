import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { IsNotEmpty, IsEmail, IsString, Length, IsIn } from 'class-validator';
import { Campaign } from './campaign';
import { SendingList } from './sendingList';
import { Contact } from './contact';
import { Message } from './message';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid') // Gerador automático de UUID para o ID
  id: string;

  @Column({ unique: true }) // Garante que o email seja único
  @IsNotEmpty({ message: "O e-mail é obrigatório." }) // Validação: campo não pode ser vazio
  @IsEmail({}, { message: "O e-mail deve ser válido." }) // Validação: deve ser um e-mail válido
  email: string;

  @Column()
  @IsNotEmpty({ message: "A senha é obrigatória." }) // Validação: campo não pode ser vazio
  @Length(6, 100, { message: "A senha deve ter no mínimo 6 caracteres." }) // Validação: tamanho entre 6 e 100 caracteres
  password: string;

  @Column()
  @IsNotEmpty({ message: "O nome é obrigatório." }) // Validação: campo não pode ser vazio
  @IsString({ message: "O nome deve ser uma string válida." }) // Validação: deve ser uma string
  @Length(3, 50, { message: "O nome deve ter entre 3 e 50 caracteres." }) // Sugestão: limitar o tamanho do nome
  name: string;

  @Column({ default: 'user' }) // Define o valor padrão como 'user'
  @IsIn(['user', 'admin'], { message: "O papel deve ser 'user' ou 'admin'." }) // Validação: apenas 'user' ou 'admin'
  role: string;

  // Relacionamentos
  @OneToMany(() => Campaign, (campaign) => campaign.user)
  campaigns: Campaign[];

  @OneToMany(() => SendingList, (sendingList) => sendingList.user)
  sendingLists: SendingList[];

  @OneToMany(() => Contact, (contact) => contact.user)
  contacts: Contact[];

  @OneToMany(() => Message, (message) => message.user)
  messages: Message[];

  @Column({ default: () => 'CURRENT_TIMESTAMP' }) // Define o timestamp atual como valor padrão
  createdAt: Date;
}
