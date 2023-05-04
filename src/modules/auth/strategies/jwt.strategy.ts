import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UserService } from '@src/modules/user/user.service';
import { ConfigService } from '@nestjs/config';
import { RedisCacheService } from '@src/modules/redis-cache/redis-cache.service';
import { Request } from 'express';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private userService: UserService,
    private configService: ConfigService,
    private redisCacheService: RedisCacheService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('jwt.secret'),
    });
  }

  async validate(payload: any) {
    try {
      console.log('payload', payload);
      const existUser = this.userService.findOne(payload.sub);

      if (!existUser) {
        throw new UnauthorizedException();
      }
      return { ...payload, id: payload.sub };
    } catch (error) {
      console.log('error', error);
    }
  }
}
