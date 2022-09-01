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
import { LoginGuard } from 'src/user/login.guard';
import { Request } from 'express';
import { TokenService } from './token.service';
import { Token } from './token.entity';
@Controller('token')
export class TokenController {
  constructor(private readonly service: TokenService) {}

  @Post('new')
  async register(@Body() token: Token) {
    return await this.service.create(token);
    
  }
}
