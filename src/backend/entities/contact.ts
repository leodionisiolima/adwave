import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { IsNotEmpty, IsString, IsPhoneNumber } from 'class-validator';
import { User } from './user';

@Entity()
export class Contact {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  @IsNotEmpty({ message: "O nome do contato é obrigatório." })
  @IsString({ message: "O nome deve ser uma string válida." })
  name: string;

  @Column({ unique: true })
  @IsPhoneNumber('BR', { message: "O número de telefone deve ser válido." })
  phoneNumber: string;

  @ManyToOne(() => User, (user) => user.contacts)
  user: User;

  @Column({ default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;
}
