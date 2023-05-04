import { Logger } from 'winston';
import {
  ExceptionFilter,
  Catch,
  HttpException,
  ArgumentsHost,
  HttpStatus,
} from '@nestjs/common';

/**
 * @class HttpExceptionFilter
 * @classdesc 拦截全局抛出的所有异常，同时任何错误将在这里被规范化输出 THttpErrorResponse
 */
@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  constructor(private readonly logger: Logger) {}

  catch(exception: HttpException, host: ArgumentsHost) {
    const request = host.switchToHttp().getRequest();
    const response = host.switchToHttp().getResponse();

    const message = exception.message;
    const errorResponse = {
      data: {
        error: message,
      }, // 获取全部的错误信息
      message: message || '请求失败',
      code: 0, // 自定义code
    };
    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;
    const { url, headers, method, body } = request;
    const ua = headers['user-agent'];
    // 设置返回的状态码、请求头、发送错误信息
    this.logger.error(
      `${method} ${url} ${ua} ${JSON.stringify(body)} ${exception.stack}`,
    );
    errorResponse.code = status;
    response.status(200);
    response.header('Content-Type', 'application/json; charset=utf-8');
    response.send(errorResponse);
  }
}
