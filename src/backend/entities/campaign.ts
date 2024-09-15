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

<<<<<<< HEAD
=======
  @Column({ type: 'timestamp' })
>>>>>>> a646052 (salvando minhas alterações porque o mouse parou de funcionar)
  updatedAt: Date;
}

