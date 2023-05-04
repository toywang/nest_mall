import { HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '@src/modules/user/entities/user.entity';
import * as bcrypt from 'bcrypt';
import { RegisterDto } from './dto/registerDto';
import { Auth } from './entities/auth.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CommonResult } from '@src/common/CommonResult';
import { ConfigService } from '@nestjs/config';
import { RedisCache } from '../redis-cache/entities/redis-cache.entity';
import { RedisCacheService } from '../redis-cache/redis-cache.service';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Auth)
    private userRepository: Repository<Auth>,
    private readonly jwtService: JwtService,
    private readonly redisCacheService: RedisCacheService,
    private readonly configServe: ConfigService,
  ) {}
  /**
   *
   * @param username 账号
   * @param password 密码
   * Omit 提出对象中指定的字段，这里是踢出password字段
   */
  async validateUser(
    username: string,
    password: string,
  ): Promise<null | Omit<User, 'password'>> {
    const existUser = await this.findByUsername(username);
    if (!existUser) {
      return null;
    }

    const isMatch = await bcrypt.compare(password, existUser.password);

    if (!isMatch) {
      return null;
    }

    const { password: ignorePass, ...restUser } = existUser;

    return restUser;
  }

  async findByUsername(username: string) {
    return this.userRepository.findOne({
      where: { username },
    });
  }
  //通过这个方法把token存起来，然后返回给客户端，后续就可以验证token
  async login(user: Auth) {
    const { password, ...restUser } = user;

    const payload = { ...restUser, sub: user.id };
    const result = {
      tokenHead: 'Bearer ',
      token: this.jwtService.sign(payload),
      user: restUser,
      expiresIn: this.configServe.get('jwt.expiresIn'),
    };
    const key = `${payload.id}-${payload.username}`;
    await this.redisCacheService.cacheSet(
      key,
      result.token,
      this.configServe.get<number>('redis.token_expire'),
    );
    return result;
  }
  async register(user: RegisterDto) {
    const existUser = await this.findByUsername(user.username);
    if (existUser) {
      return CommonResult.failedCommon('该用户已注册', HttpStatus.BAD_REQUEST);
    }
    try {
      const admin = new Auth();
      admin.username = user.username;
      admin.password = user.password;
      const result = await this.userRepository.save(admin);
      return CommonResult.successCommon(result);
    } catch (error) {
      return CommonResult.failedCommon(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
