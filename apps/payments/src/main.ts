import { NestFactory } from '@nestjs/core';
import { PaymentsModule } from './payments.module';
import { ConfigService } from '@nestjs/config';
import { Transport } from '@nestjs/microservices';
import { Logger } from 'nestjs-pino';

async function bootstrap() {
  const app = await NestFactory.create(PaymentsModule);
  const configService = app.get(ConfigService);

  app.connectMicroservice({
    transport: Transport.TCP,
    options: {
      host: 'localhost',
      port: parseInt(configService.get('TCP_PORT'), 10),
    },
  });

  app.useLogger(app.get(Logger));

  await app.startAllMicroservices();
  console.table({
    Transport: {
      TCP_PORT: configService.get('TCP_PORT'),
      HOST: 'localhost',
    },
  });
}
bootstrap();
