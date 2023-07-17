import { HttpService } from '@app/common/http';
import { Injectable, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class StrapiService {
  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {}

  async getPosts() {
    try {
      return await this.httpService.get('https://cat-fact.herokuapp.com/facts');
    } catch (error) {
      throw new NotFoundException();
    }
  }
}
