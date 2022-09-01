import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult } from 'typeorm/query-builder/result/DeleteResult';
import { UserRepository } from './user.repository';
import { User } from './user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserRepository) private repository: UserRepository,
  ) {}

  async create(user: User): Promise<User> {
    user.password = await bcrypt.hash(user.password, 12);
    return await this.repository.save(user);
  }

  async findOne(condition: any): Promise<User> {
    return this.repository.findOne(condition);
  }
}
