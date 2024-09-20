import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { IsNotEmpty, IsString, IsIn } from 'class-validator';
import { User } from './user';
import { Campaign } from './campaign';

@Entity()
export class Message {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  @IsNotEmpty({ message: "O conteúdo da mensagem é obrigatório." })
  @IsString({ message: "O conteúdo deve ser uma string válida." })
  content: string;

  @Column()
  @IsIn(['text', 'image', 'audio', 'video'], { message: "O tipo de mensagem deve ser 'text', 'image', 'audio' ou 'video'." })
  messageType: string;

  @ManyToOne(() => User, (user) => user.messages)
  user: User;

  @ManyToOne(() => Campaign, (campaign) => campaign.messages)
  campaign: Campaign;

  @Column({ default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;
}
