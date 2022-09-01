import { EntityRepository, Repository } from 'typeorm';
import { Question } from './question.enity';

@EntityRepository(Question)
export class QuestionRepository extends Repository<Question> {}
