import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { IsNotEmpty, IsString, IsPhoneNumber } from 'class-validator';
import { User } from './user';

@Entity()
export class Contact {
  @PrimaryGeneratedColumn('uuid') // Gera um UUID único para cada contato
  id: string;

  @Column()
  @IsNotEmpty({ message: "O nome do contato é obrigatório." }) // Validação: campo não pode ser vazio
  @IsString({ message: "O nome deve ser uma string válida." }) // Validação: deve ser uma string
  name: string;

  @Column({ unique: true }) // Garante que o número de telefone seja único
  @IsPhoneNumber('BR', { message: "O número de telefone deve ser válido." }) // Validação: deve ser um número de telefone válido no formato brasileiro
  phoneNumber: string;

  // Relacionamentos
  @ManyToOne(() => User, (user) => user.contacts) // Relação N-1 com User
  user: User;

  @Column({ default: () => 'CURRENT_TIMESTAMP' }) // Timestamp atual como valor padrão
  createdAt: Date;
}
