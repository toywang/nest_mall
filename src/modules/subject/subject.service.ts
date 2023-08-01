import { Injectable } from '@nestjs/common';
import { CreateSubjectDto } from './dto/create-subject.dto';
import { UpdateSubjectDto } from './dto/update-subject.dto';
import { BasePageDto } from '@src/common/BasePageDto';
import { Subject } from './entities/subject.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';

@Injectable()
export class SubjectService {
  constructor(
    @InjectRepository(Subject)
    private subjectRepository: Repository<Subject>,
  ) {}

  async findAll() {
    const res = await this.subjectRepository.find();
    return res;
  }

  /**
   * 查询
   * @param dto
   * @returns
   */
  async getPageList(dto: BasePageDto) {
    const { keyword, pageSize, pageNum } = dto;
    const queryFilter: any = {};
    if (keyword) {
      // 模糊查询 username
      queryFilter.title = Like(`%${keyword}%`);
    }
    const res = await this.subjectRepository.findAndCount({
      // 查询条件
      where: queryFilter,
      // offset，分页的偏移量
      skip: (pageNum - 1) * pageSize,
      // 每页条数
      take: pageSize,
      // 是否缓存
      cache: true,
    });
    return res;
  }
}
