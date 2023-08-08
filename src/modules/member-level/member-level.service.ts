import { Injectable } from '@nestjs/common';
import { CreateMemberLevelDto } from './dto/create-member-level.dto';
import { UpdateMemberLevelDto } from './dto/update-member-level.dto';
import { MemberLevel } from './entities/member-level.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class MemberLevelService {
  constructor(
    @InjectRepository(MemberLevel)
    private mlRepository: Repository<MemberLevel>,
  ) {}

  async findAll(status: number) {
    console.log('status的值', status);
    const result = await this.mlRepository.find({
      where: {
        defaultStatus: status,
      },
    });
    return result;
  }
}
