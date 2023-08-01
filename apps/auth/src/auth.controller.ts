import {
  Controller,
  Get,
  Post,
  Res,
  UseFilters,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { UserDocument } from './users/models/user.schema';
import { Response } from 'express';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { AuthService } from 'apps/auth/src/auth.service';
import {
  AllExceptionFilter,
  CurrentUser,
  HybridExceptionFilter,
  ResourceSerialization,
} from '@app/common';
import * as _ from 'lodash';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @UseGuards(LocalAuthGuard)
  @UseInterceptors(new ResourceSerialization())
  async login(
    @CurrentUser() user: UserDocument,
    @Res({ passthrough: true }) res: Response,
  ) {
    const token = await this.authService.login(user, res);
    const data = {
      token,
      message: 'login success',
    };

    return data;
  }

  @Get('fetch')
  @UseInterceptors(new ResourceSerialization())
  async fetchApi() {
    return await this.authService.fetchExample();
  }

  @UseGuards(JwtAuthGuard)
  @MessagePattern('authenticate')
  async authenticate(@Payload() data: any) {
    return data.user;
  }
}
