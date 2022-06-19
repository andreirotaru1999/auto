import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { QuestionService } from './question.service';
import { Question } from './question.enity';

@Controller('question')
export class QuestionController {
  constructor(private service: QuestionService) {}

  @Post('new')
  async addAQuestion(@Body() question: Question) {
    return await this.service.create(question);
  }

  @Get('')
  async getAllQuestion() {
    return await this.service.getAllQuestions();
  }

  @Get('/:id')
  async getQuestion(@Param('id') id: string) {
    return await this.service.findQuestion(id);
  }

  @Put('/:id/edit')
  async editQuestion(@Body() question: Question) {
    return await this.service.update(question);
  }

  @Delete('/:id')
  async deleteQuestion(@Param('id') id: string) {
    const user = await this.service.findQuestion(id);
    if (user) {
      return await this.service.deleteQuestion(id);
    }
  }
}
