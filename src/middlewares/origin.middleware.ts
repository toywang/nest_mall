import { Injectable, NestMiddleware, HttpStatus } from '@nestjs/common';

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
