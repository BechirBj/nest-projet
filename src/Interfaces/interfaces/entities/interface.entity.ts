import { UserEntity } from 'src/users/User.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('Interfaces')
export class InterMiami {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column()
  content: string;

  @CreateDateColumn({ type: 'timestamp' })
  CreationDate: Date;

  @ManyToOne(() => UserEntity, (user) => user.interfaces, {
    onDelete: 'CASCADE',
    eager: true,
  })
  owner: UserEntity;
}
