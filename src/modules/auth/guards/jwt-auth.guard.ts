import {
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Observable } from 'rxjs';
import { Reflector } from '@nestjs/core';
import { IS_PUBLIC_KEY } from '../constants';
import { JwtService } from '@nestjs/jwt';
import { RedisCacheService } from '@src/modules/redis-cache/redis-cache.service';
import { ConfigService } from '@nestjs/config';
import { Request } from 'express';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(
    private reflector: Reflector,
    private configService: ConfigService,
    private redisCacheService: RedisCacheService,
    private jwtService: JwtService,
  ) {
    super();
  }

  // canActivate(
  //   context: ExecutionContext,
  // ): boolean | Promise<boolean> | Observable<boolean> {
  //   // 自定义用户身份验证逻辑
  //   const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
  //     context.getHandler(),
  //     context.getClass(),
  //   ]);
  //   // skip
  //   if (isPublic) return true;
  //   const cacheToken = await this.redisCacheService.cacheGet(
  //     `${user.id}&${user.username}&${user.role}`,
  //   );
  //   if (!cacheToken) {
  //     throw new UnauthorizedException('token 已过期');
  //   }

  //   return super.canActivate(context);
  // }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (isPublic) {
      return true;
    }
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);

    const payload = await this.jwtService.verifyAsync(token, {
      secret: this.configService.get<string>('jwt.secret'),
    });
    let tokenNotTimeOut = true;
    try {
      const key = `${payload.id}-${payload.username}`;
      const redis_token = await this.redisCacheService.cacheGet(key);
      if (redis_token !== token) {
        throw new UnauthorizedException('请重新登录');
      }
      this.redisCacheService.cacheSet(
        key,
        token,
        this.configService.get<number>('redis.token_expire'),
      );
    } catch (err) {
      tokenNotTimeOut = false;
      throw new UnauthorizedException('请重新登录');
    }
    return tokenNotTimeOut && (super.canActivate(context) as boolean);
  }
  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
  handleRequest(err, user) {
    // 处理 info
    if (err || !user) {
      throw err || new UnauthorizedException();
    }
    return user;
  }
}
