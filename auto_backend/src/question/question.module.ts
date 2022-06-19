import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { QuestionRepository } from './question.repository';
import { QuestionService} from './question.service';
import { QuestionController } from './quesion.controller';

@Module({
  imports: [TypeOrmModule.forFeature([QuestionRepository])],
  controllers: [QuestionController],
  providers: [QuestionService],
  exports: [QuestionService],
})
export class QuestionModule {}
