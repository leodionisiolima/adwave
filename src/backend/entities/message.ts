import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { IsNotEmpty, IsString, IsIn } from 'class-validator';
import { User } from './user';
import { Campaign } from './campaign';

@Entity()
export class Message {
  @PrimaryGeneratedColumn('uuid') // Gera um UUID único para cada mensagem
  id: string;

  @Column()
  @IsNotEmpty({ message: "O conteúdo da mensagem é obrigatório." }) // Validação: campo não pode ser vazio
  @IsString({ message: "O conteúdo deve ser uma string válida." }) // Validação: deve ser uma string
  content: string;

  @Column()
  @IsIn(['text', 'image', 'audio', 'video'], { message: "O tipo de mensagem deve ser 'text', 'image', 'audio' ou 'video'." }) // Validação: deve ser um tipo válido
  messageType: string;

  // Relacionamentos
  @ManyToOne(() => User, (user) => user.messages) // Relação N-1 com User
  user: User;

  @ManyToOne(() => Campaign, (campaign) => campaign.messages) // Relação N-1 com Campaign
  campaign: Campaign;

  @Column({ default: () => 'CURRENT_TIMESTAMP' }) // Timestamp atual como valor padrão
  createdAt: Date;
}
