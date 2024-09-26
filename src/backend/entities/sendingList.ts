import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable, ManyToOne } from 'typeorm';
import { IsNotEmpty, IsString } from 'class-validator';
import { Contact } from './contact';
import { User } from './user';

@Entity()
export class SendingList {
  @PrimaryGeneratedColumn('uuid') // Gera um UUID único para cada lista de envio
  id: string;

  @Column()
  @IsNotEmpty({ message: "O nome da lista de envio é obrigatório." }) // Validação: campo não pode ser vazio
  @IsString({ message: "O nome deve ser uma string válida." }) // Validação: deve ser uma string
  name: string;

  // Relacionamentos
  @ManyToMany(() => Contact) // Relação N-N com a entidade Contact
  @JoinTable() // Cria a tabela de junção para a relação many-to-many
  contacts: Contact[];

  @ManyToOne(() => User, (user) => user.sendingLists) // Relação N-1 com User
  user: User;

  @Column({ default: () => 'CURRENT_TIMESTAMP' }) // Timestamp atual como valor padrão
  createdAt: Date;
}
