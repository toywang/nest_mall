import { Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/user/entities/user.entity';
import { jwtConstants } from './constants';
import * as bcrypt from 'bcrypt';
import { RegisterDto } from './dto/registerDto';
import { Auth } from './entities/auth.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Auth)
    private userRepository: Repository<Auth>,
    private readonly jwtService: JwtService,
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

    return {
      token: this.jwtService.sign(payload),
      user: restUser,
      expiresIn: jwtConstants.expiresIn,
    };
  }
  async register(user: RegisterDto) {
    const existUser = await this.findByUsername(user.username);
    if (existUser) {
      return {
        code: 400,
        message: '用户已存在',
      };
    }
    try {
      const admin = new Auth();
      admin.username = user.username;
      admin.password = user.password;
      return this.userRepository.save(admin);
    } catch (error) {
      return {
        code: 503,
        msg: `Service error: ${error}`,
      };
    }
  }
}
