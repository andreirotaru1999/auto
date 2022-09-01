import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  BadRequestException,
  Res,
  Req,
  UnauthorizedException,
  UseGuards,
  SetMetadata,
} from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './user.entity';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { Request, Response } from 'express';
import { Roles } from './roles.decorator';
import { RolesGuard } from './roles.guard';
import { LoginGuard } from './login.guard';
import { TokenService } from '../authentication/token.service';
import { Token } from '../authentication/token.entity';

@Controller('user')
export class UserController {
  constructor(
    private readonly service: UserService,
    private jwtService: JwtService,
    private readonly tokenServide: TokenService
  ) {}

  @Post('new')
  async register(@Body() user: User) {
    const rez = await this.service.create(user);
    const { password, ...result } = rez;
    return result;
  }

  @Post('login')
  async login(
    @Body('name') name: string,
    @Body('password') password: string,
    @Res({ passthrough: true }) response: Response,
  ) {
    const user = await this.service.findOne({ name });
    if (!user) {
      throw new BadRequestException('invalid user credentials');
    }

    if (!(await bcrypt.compare(password, user.password))) {
      throw new BadRequestException('invalid user credentials');
    }
    const jwt = await this.jwtService.signAsync({
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    });
    response.cookie('jwt', jwt, { httpOnly: true });
    const token: Token = new Token();
    token.content = jwt;
    token.expirationDate = new Date();
    token.expirationDate.setTime(
      token.expirationDate.getTime() + 8 * 60 * 60 * 1000,
    );
    await this.tokenServide.create(token);
    return {
      message: 'success',
    };
  }
  @Get('')
  async user(@Req() request: Request) {
    try {
      const cookie = request.cookies['jwt'];
      const data = await this.jwtService.verifyAsync(cookie);
      const user = await this.service.findOne({ id: data['id'] });
      const { password, ...result } = user;
      return result;
    } catch (error) {
      return false;
    }
  }
  
  @Post('logout')
  async logout(@Res({ passthrough: true }) response: Response){
    response.clearCookie('jwt');
    return {
      message: 'success',
    };
  }
  @Roles('admin','student')
  @UseGuards(RolesGuard)
  @Get('tests')
  async getUserTests(@Req() request: Request) {
    try {
      const cookie = request.cookies['jwt'];
      const data = await this.jwtService.verifyAsync(cookie);
      if (!data) {
        throw new UnauthorizedException();
      }
      const user = await this.service.findOne({ id: data['id'] });
      return user.tests;
    } catch (e) {
      throw new UnauthorizedException();
    }
  }
  
}
