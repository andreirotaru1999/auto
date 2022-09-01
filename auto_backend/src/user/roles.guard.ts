import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';


@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector, private jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    try {
      const requiredRoles = this.reflector.getAllAndOverride<string>('role', [
        context.getHandler(),
        context.getClass(),
      ]);
      const jwt = context.switchToHttp().getRequest().cookies.jwt;
      const data = await this.jwtService.verifyAsync(jwt);
      console.log(data);
      if (requiredRoles.includes(data.role)) {
        return true;
      } else {
        return false;
      }
    } catch (error) {
      return false;
    }
    
  }
}
