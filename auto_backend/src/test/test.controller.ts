import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { TestService } from './test.service';
import { Test } from './entities/test.entity';

@Controller('test')
export class TestController {
  constructor(private readonly service: TestService) {}

  @Post('new')
  async addATest(@Body() test: Test) {
    return await this.service.save(test);
  }

  @Get('')
  async getNewTest(@Body() questionsCount: number) {
    return await this.service.generate(questionsCount);
  }

  @Get('/:id')
  async getTest(@Param('id') id: string) {
    return await this.service.findTest(id);
  }

  @Put('/:id/edit')
  async editTest(@Body() test: Test) {
    return await this.service.update(test);
  }

  @Delete('/:id')
  async deleteTest(@Param('id') id: string) {
    const user = await this.service.findTest(id);
    if (user) {
      return await this.service.deleteTest(id);
    }
  }
}
