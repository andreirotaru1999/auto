import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult } from 'typeorm/query-builder/result/DeleteResult';
import { Test } from './entities/test.entity';
import { TestRepository } from './test.repository';
import { Question } from '../question/question.enity';
import { QuestionService } from '../question/question.service';
import { UserService } from '../user/user.service';

@Injectable()
export class TestService {
  private readonly logger = new Logger(TestService.name);
  constructor(
    @InjectRepository(TestRepository) private repository: TestRepository,
    private questionService: QuestionService,
    private userService: UserService,
  ) {}

  async save(test: Test, id: string): Promise<Test> {
    const user = await this.userService.findOne(id);
    if (user) {
      test.user = user;
    }
    test.startedOn = new Date(test.startedOn)
    return await this.repository.save(test);
  }

  async generate(questionsCount: number) {
    const test: Test = new Test();
    const questions: Question[] = await this.questionService.getAllQuestions();
    const selectedQuestions = [];
    test.startedOn = new Date();
    for (let i = 0; i < questionsCount; i++) {
      const index = Math.floor(Math.random() * questions.length);
      selectedQuestions.push(questions[index]);
      questions.splice(index, 1);
    }
    test.questions = selectedQuestions;
    return test;
  }

  async findAll(): Promise<Test[]> {
    return await this.repository.find();
  }

  async findTest(id: string) {
    const found: Test = await this.repository.findOne({
      where: {
        id: id,
      },
    });
    if (!found) {
      throw new HttpException('Question not found', HttpStatus.NOT_FOUND);
    }
    return found;
  }

  async update(test: Test): Promise<Test> {
    const found: Test = await this.repository.findOne({
      where: {
        id: test.id,
      },
    });
    if (!found) {
      throw new HttpException(
        'No question found to update',
        HttpStatus.NOT_FOUND,
      );
    }
    return await this.repository.save(test);
  }
  async deleteTest(id: string): Promise<DeleteResult> {
    return await this.repository.delete(id);
  }
}
