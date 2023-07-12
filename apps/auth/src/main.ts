import { NestFactory } from '@nestjs/core';
import { AuthModule } from './auth.module';
import setUpApplication from '@app/common/setup';
import { Transport } from '@nestjs/microservices';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AuthModule);
  const configService = app.get(ConfigService);
  const { port, logInfo } = setUpApplication(app);

  await app.listen(port);
  logInfo();

  app.connectMicroservice({
    transport: Transport.TCP,
    options: {
      host: 'localhost',
      port: parseInt(configService.get('TCP_PORT'), 10),
    },
  });

  await app.startAllMicroservices();
}
bootstrap();
