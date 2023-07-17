import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Logger } from 'nestjs-pino';
import * as CookieParser from 'cookie-parser';
import { ConfigService } from '@nestjs/config';
import {
  LoggingInterceptor,
  ResourceSerialization,
  TimeoutInterceptor,
} from '../interceptor';
import { AllExceptionFilter } from '../exception';

const setUpApplication = (app: INestApplication) => {
  app.setGlobalPrefix('api');
  app.enableCors({
    origin: '*',
    methods: ['GET', 'POST', 'PATCH', 'PUT', 'DELETE'],
    allowedHeaders: [
      'Content-Type',
      'Accept',
      'Authorization',
      'X-Requested-With',
    ],
  });

  app.use(CookieParser());
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
  app.useGlobalInterceptors(
    new ResourceSerialization(),
    new TimeoutInterceptor(),
    new LoggingInterceptor(),
  );

  app.useGlobalFilters(new AllExceptionFilter());
  // app.useLogger(app.get(Logger));

  const configService = app.get(ConfigService);

  const port = parseInt(configService.get<string>('PORT'), 10);

  return {
    port,
    logInfo: () =>
      console.table({
        port,
        service: configService.get('SERVICE_NAME'),
      }),
  };
};

export default setUpApplication;
