import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { QuestionModule } from '../question/question.module';
import { UserController } from './user.controller';
import { UserRepository } from './user.repository';
import { JwtModule } from '@nestjs/jwt';
import { TokenModule } from '../authentication/token.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserRepository]),
    QuestionModule,
    TokenModule,
    JwtModule.register({
      secret: 'secret',
      signOptions: { expiresIn: '8h' },
    }),
  ],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
