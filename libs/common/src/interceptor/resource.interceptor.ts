import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable, lastValueFrom, of } from 'rxjs';
import { formatResource } from './utils';

@Injectable()
export class ResourceSerialization implements NestInterceptor {
  async intercept(
    ctx: ExecutionContext,
    next: CallHandler,
  ): Promise<Observable<any>> {
    const response = await lastValueFrom(next.handle());
    return of(formatResource(response));
  }
}
