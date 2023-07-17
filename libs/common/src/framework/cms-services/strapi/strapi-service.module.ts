import { Module } from '@nestjs/common';
import { StrapiService } from './strapi-service.service';
import { HttpModule } from '@app/common/http';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    HttpModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        timeout: configService.get<number>('STRAPI_TIMEOUT'),
        maxRedirects: configService.get<number>('STRAPI_MAXREDIRECTS'),
      }),
    }),
  ],
  providers: [StrapiService],
  exports: [StrapiService],
})
export class StrapiServicesModule {}
