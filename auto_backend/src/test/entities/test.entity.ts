import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Question } from '../../question/question.enity';

@Entity('test')
export class Test {
  @PrimaryGeneratedColumn()
  id: string;

  @Column({ name: 'started_on', type: 'date' })
  startedOn: Date;

  @Column({ name: 'answers', nullable: true })
  answers: string;

  @OneToMany(() => Question, (question: Question) => question.test, {
    cascade: true,
  })
  public question: Question[];
}
