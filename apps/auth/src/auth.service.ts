import { Injectable } from '@nestjs/common';
import { UserDocument } from './users/models/user.schema';
import { Response } from 'express';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { TokenPayload } from './interfaces/tokenPayload.interface';
import { StrapiService } from '@app/common';

@Injectable()
export class AuthService {
  constructor(
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
    private readonly strapiService: StrapiService,
  ) {}

  async login(user: UserDocument, res: Response) {
    const tokenPayload: TokenPayload = {
      userId: user._id.toHexString(),
    };
    const expires = new Date();
    expires.setSeconds(
      expires.getSeconds() + Number(this.configService.get('JWT_EXPIRATION')),
    );

    const token = await this.jwtService.sign(tokenPayload);

    res.cookie('Authentication', token, {
      httpOnly: true,
      expires,
    });

    return token;
  }

  async fetchExample() {
    return this.strapiService.getPosts();
  }
}
