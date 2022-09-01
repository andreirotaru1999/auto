import { Module } from '@nestjs/common';
import { TestService } from './test.service';
import { TestController } from './test.controller';
import { TestRepository } from './test.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { QuestionModule } from '../question/question.module';
import { UserModule } from '../user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { TokenModule } from '../authentication/token.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([TestRepository]),
    QuestionModule,
    UserModule,
    TokenModule,
    JwtModule.register({
      secret: 'secret',
      signOptions: { expiresIn: '1d' },
    }),
  ],
  controllers: [TestController],
  providers: [TestService],
})
export class TestModule {}
