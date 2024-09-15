import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()

export class Campaign {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  message: string;

  @Column({ type: 'timestamp' })
  createdAt: Date;

  @Column({ type: 'timestamp' })
  updatedAt: Date;
}

