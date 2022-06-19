import { Module } from '@nestjs/common';
import { TestService } from './test.service';
import { TestController } from './test.controller';
import { TestRepository } from './test.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { QuestionModule } from '../question/question.module';

@Module({
  imports: [TypeOrmModule.forFeature([TestRepository]), QuestionModule],
  controllers: [TestController],
  providers: [TestService],
})
export class TestModule {}
