// entities/message.ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { User } from './user';
import { Campaign } from './campaign';

@Entity()
export class Message {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  content: string; // Pode armazenar o texto ou o caminho do arquivo (imagem, áudio, vídeo)

  @Column()
  messageType: string; // text, image, audio, video

  @ManyToOne(() => User, (user) => user.messages)
  user: User; // Quem criou a mensagem

  @ManyToOne(() => Campaign, (campaign) => campaign.messages)
  campaign: Campaign;

  @Column({ default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;
}
