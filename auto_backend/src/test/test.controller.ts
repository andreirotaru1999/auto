import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  UseGuards,
  Req,
} from '@nestjs/common';
import { TestService } from './test.service';
import { Test } from './entities/test.entity';
import { LoginGuard } from 'src/user/login.guard';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
@Controller('test')
export class TestController {
  constructor(
    private readonly service: TestService,
    private jwtService: JwtService,
  ) {}

  @UseGuards(LoginGuard)
  @Post('new')
  async addATest(@Body() test: Test, @Req() request: Request) {
    const cookie = request.cookies['jwt'];
    const data = await this.jwtService.verifyAsync(cookie);
    const id = data.id;
    console.log("controller: ",test,id);
    return await this.service.save(test, id);
  }

  @Get('generate/:numberOfQuestions')
  async getNewTest(@Param('numberOfQuestions') numberOfQuestions: number) {
    return await this.service.generate(numberOfQuestions);
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
