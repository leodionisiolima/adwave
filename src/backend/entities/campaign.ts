import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, ManyToMany, JoinTable, OneToMany } from 'typeorm';
import { IsNotEmpty, IsString, IsDate } from 'class-validator';
import { User } from './user';
import { SendingList } from './sendingList';
import { Message } from './message';

@Entity()
export class Campaign {
  @PrimaryGeneratedColumn('uuid') // Gera um UUID único para cada campanha
  id: string;

  @Column()
  @IsNotEmpty({ message: "O nome da campanha é obrigatório." }) // Validação: campo não pode ser vazio
  @IsString({ message: "O nome deve ser uma string válida." }) // Validação: deve ser uma string
  name: string;

  // Relacionamentos
  @OneToMany(() => Message, (message) => message.campaign) // Relação 1-N com Message
  messages: Message[];

  @ManyToMany(() => SendingList) // Relação N-N com SendingList
  @JoinTable() // Cria a tabela de junção para a relação ManyToMany
  sendingLists: SendingList[];

  @ManyToOne(() => User, (user) => user.campaigns) // Relação N-1 com User
  user: User;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' }) // Define o timestamp atual como valor padrão
  @IsDate({ message: "A data de criação deve ser uma data válida." }) // Validação: deve ser uma data válida
  createdAt: Date;
}
