import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable, ManyToOne } from 'typeorm';
import { IsNotEmpty, IsString } from 'class-validator';
import { Contact } from './contact';
import { User } from './user';

@Entity()
export class SendingList {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  @IsNotEmpty({ message: "O nome da lista de envio é obrigatório." })
  @IsString({ message: "O nome deve ser uma string válida." })
  name: string;

  @ManyToMany(() => Contact)
  @JoinTable()
  contacts: Contact[];

  @ManyToOne(() => User, (user) => user.sendingLists)
  user: User;

  @Column({ default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;
}
