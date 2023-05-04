import { Injectable } from '@nestjs/common';

import { Resource } from './entities/resource.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { ResourcePageDto } from './dto/resourcePage.dto';
import { ResourceInfoDto } from './dto/resourceInfo.dto';

@Injectable()
export class ResourceService {
  constructor(
    @InjectRepository(Resource)
    private resRepository: Repository<Resource>,
  ) {}

  async findAll() {
    const result = await this.resRepository.find();
    return result;
  }

  /**
   * 查询 资源列表 分页
   * @param dto
   * @returns
   */
  async getResourcePageList(dto: ResourcePageDto) {
    const { urlKeyword, nameKeyword, categoryId, pageSize, pageNum } = dto;
    const queryFilter: any = {};
    if (nameKeyword) {
      queryFilter.name = Like(`%${nameKeyword}%`);
    }
    if (urlKeyword) {
      queryFilter.url = Like(`%${urlKeyword}%`);
    }
    if (categoryId) {
      queryFilter.categoryId = categoryId;
    }
    const res = await this.resRepository.findAndCount({
      // 查询条件
      where: queryFilter,
      // 排序
      order: { createTime: 'DESC' },
      // offset，分页的偏移量
      skip: (pageNum - 1) * pageSize,
      // 每页条数
      take: pageSize,
      // 是否缓存
      cache: true,
    });
    return res;
  }

  /**
   * 删除资源
   * @param id
   * @returns
   */
  async deleteResource(id: number) {
    const result = await this.resRepository.delete({ id: id });
    return '删除成功';
  }
}
