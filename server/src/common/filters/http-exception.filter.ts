import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    // 兼容 nestjs 的 message 结构和自定义 message
    let message =
      exception instanceof HttpException
        ? (exception.getResponse() as any).message || exception.message
        : '服务器内部错误';
    if (Array.isArray(message)) {
      message = message.join('; ');
    }

    response.status(status).json({
      code: status,
      msg: message,
      data: null,
    });
  }
}
