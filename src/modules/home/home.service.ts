import { Injectable } from '@nestjs/common';
import { CreateHomeDto } from './dto/create-home.dto';
import { UpdateHomeDto } from './dto/update-home.dto';
import { ApiOperation } from '@nestjs/swagger';
import { BasePageDto } from '@src/common/BasePageDto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Subject } from '../subject/entities/subject.entity';

@Injectable()
export class HomeService {
  constructor(
    @InjectRepository(Subject)
    private brandRepository: Repository<Subject>,
  ) {}

  create(createHomeDto: CreateHomeDto) {
    return 'This action adds a new home';
  }

  // async recommendSubjectList(page: BasePageDto) {
  //   const { keyword, pageSize, pageNum } = dto;
  //   const queryFilter: any = {};
  //   if (keyword) {
  //     // 模糊查询 username
  //     queryFilter.name = Like(`%${keyword}%`);
  //   }
  //   const res = await this.brandRepository.findAndCount({
  //     // 查询条件
  //     where: queryFilter,
  //     // 排序
  //     order: { sort: 'DESC' },
  //     // offset，分页的偏移量
  //     skip: (pageNum - 1) * pageSize,
  //     // 每页条数
  //     take: pageSize,
  //     // 是否缓存
  //     cache: true,
  //   });
  //   return res;
  // }

  findAll() {
    return `This action returns all home`;
  }

  findOne(id: number) {
    return `This action returns a #${id} home`;
  }

  update(id: number, updateHomeDto: UpdateHomeDto) {
    return `This action updates a #${id} home`;
  }

  remove(id: number) {
    return `This action removes a #${id} home`;
  }
}
