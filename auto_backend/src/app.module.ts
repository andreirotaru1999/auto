import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { QuestionModule } from './question/question.module';
import { Question } from './question/question.enity';
import { TestModule } from './test/test.module';
import { Test } from './test/entities/test.entity';
import { User } from './user/user.entity';
import { UserModule } from './user/user.module';
import { Token } from './authentication/token.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: '127.0.0.1',
      port: 3307,
      username: 'root',
      password: 'icedmg',
      database: 'auto',
      entities: [Question, Test, User, Token],
      synchronize: true,
    }),
    QuestionModule,
    TestModule,
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
