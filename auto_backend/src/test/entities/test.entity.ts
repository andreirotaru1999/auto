import { User } from 'src/user/user.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Question } from '../../question/question.enity';

@Entity('test')
export class Test {
  @PrimaryGeneratedColumn()
  id: string;

  @Column({ name: 'started_on', type: 'date' })
  startedOn: Date;

  @Column({ name: 'score', nullable: true })
  score: number;

  @Column({ name: 'answers', nullable: true })
  answers: string;

  @ManyToMany(() => Question, {
    cascade: true,
  })
  @JoinTable()
  questions: Question[];

  @ManyToOne(() => User, user=> user.tests)
  user: User;
}
