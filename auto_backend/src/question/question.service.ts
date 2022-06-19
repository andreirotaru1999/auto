import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Question } from './question.enity';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult } from 'typeorm/query-builder/result/DeleteResult';
import { QuestionRepository } from './question.repository';

@Injectable()
export class QuestionService {
  constructor(
    @InjectRepository(QuestionRepository)
    private repository: QuestionRepository,
  ) {}
  async create(question: Question): Promise<Question> {
    return await this.repository.save(question);
  }

  async getAllQuestions(): Promise<Question[]> {
    return await this.repository.find();
  }

  async findQuestion(id: string) {
    const found: Question = await this.repository.findOne({
      where: {
        id: id,
      },
    });
    if (!found) {
      throw new HttpException('Question not found', HttpStatus.NOT_FOUND);
    }
    return found;
  }

  async update(question: Question): Promise<Question> {
    const found: Question = await this.repository.findOne({
      where: {
        id: question.id,
      },
    });
    if (!found) {
      throw new HttpException(
        'No question found to update',
        HttpStatus.NOT_FOUND,
      );
    }
    return await this.repository.save(question);
  }

  async deleteQuestion(id: string): Promise<DeleteResult> {
    return await this.repository.delete(id);
  }
}
