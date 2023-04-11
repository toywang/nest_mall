import { Injectable, NestMiddleware, HttpStatus } from '@nestjs/common';
import { ANONYMOUSE_ERROR } from '@constants/error/general.constant';

/**
 * @class OriginMiddleware
 * @classdesc 用于验证是否为非法来源请求
 */
@Injectable()
export class OriginMiddleware implements NestMiddleware {
  use(request, response, next) {
    const { origin, referer } = request.headers;

    // 其他通行
    return next();
  }
}
