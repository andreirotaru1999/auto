import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('question')
export class Question {
  @PrimaryGeneratedColumn()
  id: string;

  @Column({ name: 'text' })
  text: string;
  @Column({ name: 'answer1' })
  answer1: string;
  @Column({ name: 'answer2' })
  answer2: string;
  @Column({ name: 'answer3' })
  answer3: string;
  @Column({ name: 'correct_answer' })
  correctAnswer: number;
  @Column({ name: 'explanations', nullable: true })
  explanations: string;
  @Column({ name: 'link', nullable: true })
  link: string;
  @Column({ name: 'image', nullable: true })
  image: string;
}
