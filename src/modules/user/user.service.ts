import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { Auth } from '../auth/entities/auth.entity';
import * as bcrypt from 'bcrypt';
import { RegisterDto } from '../auth/dto/RegisterDto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Auth)
    private authRepository: Repository<Auth>,
  ) {}
  async create(registerDto: RegisterDto) {
    return this.userRepository.save(registerDto);
  }

  findAll() {
    return `This action returns all user`;
  }

  findOne(id: number) {
    return this.authRepository.findOne({
      where: { id: id },
    });
  }
  async findByUsername(username: string) {
    return this.userRepository.findOne({
      where: { username },
    });
  }
  async checkAdmin(id: number) {
    return this.userRepository.findOne({
      where: { id, is_admin: 1 },
    });
  }

  async update(id: number, updateAuthDto: RegisterDto) {
    const admin = await this.authRepository.findOne(id);
    admin.nickName = updateAuthDto.nickName;
    admin.username = updateAuthDto.username;
    admin.icon = updateAuthDto.icon;
    admin.email = updateAuthDto.email;
    admin.note = updateAuthDto.note;
    if (admin.password !== updateAuthDto.password) {
      const salt = await bcrypt.genSalt();
      admin.password = await bcrypt.hash(updateAuthDto.password, salt);
    }
    return this.authRepository.update({ id: id }, admin);
  }

  async remove(id: number) {
    return await this.authRepository.delete({ id: id });
  }
}
