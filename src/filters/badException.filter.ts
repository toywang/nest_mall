import { Logger } from 'winston';
import {
  ExceptionFilter,
  Catch,
  HttpException,
  ArgumentsHost,
  HttpStatus,
  BadRequestException,
} from '@nestjs/common';

@Catch(BadRequestException)
export class BadHttpExceptionFilter implements ExceptionFilter {
  constructor(private readonly logger: Logger) {}

  catch(exception: HttpException, host: ArgumentsHost) {
    const request = host.switchToHttp().getRequest().req;
    const response = host.switchToHttp().getResponse();

    const badRes: any = exception.getResponse();
    let status = HttpStatus.BAD_REQUEST;
    const errorResponse = {
      data: {
        error: exception.message,
      }, // 获取全部的错误信息
      message: '请求失败',
      code: 0, // 自定义code
    };
    //处理验证失败的提示信息
    if (badRes.message) {
      errorResponse.message = badRes.message;
      status = HttpStatus.OK; //这里主要是为了前端能够提示出来信息，否则直接返回400的话，前端直接报400
    }
    // 设置返回的状态码、请求头、发送错误信息
    this.logger.error(errorResponse.toString());
    response.status(status);
    response.header('Content-Type', 'application/json; charset=utf-8');
    response.send(errorResponse);
  }
}
