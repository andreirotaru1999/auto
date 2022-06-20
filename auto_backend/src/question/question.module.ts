import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { QuestionRepository } from './question.repository';
import { QuestionService } from './question.service';
import { QuestionController } from './quesion.controller';
import { Axios } from 'axios';

@Module({
  imports: [TypeOrmModule.forFeature([QuestionRepository]), Axios],
  controllers: [QuestionController],
  providers: [QuestionService],
  exports: [QuestionService],
})
export class QuestionModule {}
