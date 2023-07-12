import { NestFactory } from '@nestjs/core';
import { ReservationsModule } from './reservations.module';
import setUpApplication from '@app/common/setup';

async function bootstrap() {
  const app = await NestFactory.create(ReservationsModule);
  const { port, logInfo } = setUpApplication(app);
  await app.listen(port);
  logInfo();
}
bootstrap();
