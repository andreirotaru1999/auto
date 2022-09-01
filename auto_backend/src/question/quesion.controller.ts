import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { QuestionService } from './question.service';
import { Question } from './question.enity';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { v4 as uuidv4 } from 'uuid';

@Controller('question')
export class QuestionController {
  constructor(private service: QuestionService) {}

  @Post('new')
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: './files',
        filename: (req, file, callback) => {
          const extension = file.mimetype.split('/')[1];
          callback(null, `${uuidv4()}.${extension}`);
        },
      }),
    }),
  )
  async addAQuestion(@Body() question: Question, @UploadedFile() file) {
    if (file) {
      question.image = file.filename;
    }
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
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: './files',
        filename: (req, file, callback) => {
          const extension = file.mimetype.split('/')[1];
          callback(null, `${uuidv4()}.${extension}`);
        },
      }),
    }),
  )
  async editQuestion(
    @Body() question: Question,
    @UploadedFile() file,
    @Param('id') id,
  ) {
    if (file) {
      question.image = file.filename;
    }
    return await this.service.updateQuestion(question, id);
  }

  @Delete('/:id')
  async deleteQuestion(@Param('id') id: string) {
    const user = await this.service.findQuestion(id);
    if (user) {
      return await this.service.deleteQuestion(id);
    }
  }
}
