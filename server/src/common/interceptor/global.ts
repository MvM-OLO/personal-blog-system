import {
  CallHandler,
  ExecutionContext,
  HttpStatus,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface Response<T> {
  data: T;
  code: number;
  message: string;
  timestamp: string;
}

@Injectable()
export class HttpInterceptor<T> implements NestInterceptor<T, Response<T>> {
  intercept(
    context: ExecutionContext,
    next: CallHandler<T>,
  ): Observable<Response<T>> {
    return next.handle().pipe(
      map((data) => {
        const response = context.switchToHttp().getResponse();
        const statusCode = response.statusCode || HttpStatus.OK;

        // 如果返回的数据已经包含了标准响应格式，直接返回
        if (this.isStandardResponse(data)) {
          return {
            ...data,
            timestamp: new Date().toISOString(),
          };
        }

        // 处理普通数据
        return {
          data,
          code: statusCode,
          message: 'success',
          timestamp: new Date().toISOString(),
        };
      }),
    );
  }

  private isStandardResponse(data: any): data is Response<any> {
    return (
      data && typeof data === 'object' && 'code' in data && 'message' in data
    );
  }
}
