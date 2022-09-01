import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { Token } from './token.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult } from 'typeorm/query-builder/result/DeleteResult';
import { TokenRepository } from './token.repository';

@Injectable()
export class TokenService {
  constructor(
    @InjectRepository(TokenRepository)
    private repository: TokenRepository,
  ) {}
  async create(token: Token): Promise<Token> {
    return await this.repository.save(token);
  }

  async findTokenByContent(content: string) {
    const found: Token = await this.repository.findOne({
      where: {
        content: content,
      },
    });
    if (!found) {
      throw new HttpException('Token not found', HttpStatus.NOT_FOUND);
    }
    return found;
  }

  async deleteToken(id: string): Promise<DeleteResult> {
    const found: Token = await this.repository.findOne({
      where: {
        id: id,
      },
    });
    if (!found) {
      throw new HttpException('Token not found', HttpStatus.NOT_FOUND);
    }
    return await this.repository.delete(id);
  }
}
