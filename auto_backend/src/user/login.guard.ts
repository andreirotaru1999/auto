import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { Role } from './role.enum';
import { TokenService } from '../authentication/token.service';

@Injectable()
export class LoginGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private jwtService: JwtService,
    private readonly tokenService: TokenService
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    try {
      const jwt = context.switchToHttp().getRequest().cookies.jwt;
      const data = await this.jwtService.verifyAsync(jwt);
      const token = await this.tokenService.findTokenByContent(jwt);
      console.log(data);
      if (token.expirationDate >= new Date()) {
        return true;
      } else {
        return false;
      }
    } catch (error) {
      console.log('login guard error: ', error);
      return false;
    }
  }
}
