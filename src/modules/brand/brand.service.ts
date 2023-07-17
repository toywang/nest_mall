import { Injectable } from '@nestjs/common';
import { CreateBrandDto } from './dto/create-brand.dto';
import { UpdateBrandDto } from './dto/update-brand.dto';
import { BasePageDto } from '@src/common/BasePageDto';
import { Like, Repository } from 'typeorm';
import { Brand } from './entities/brand.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class BrandService {
  constructor(
    @InjectRepository(Brand)
    private brandRepository: Repository<Brand>,
  ) {}
  /**
   * 查询 品牌列表
   * @param dto
   * @returns
   */
  async getBrandList(dto: BasePageDto) {
    const { keyword, pageSize, pageNum } = dto;
    const queryFilter: any = {};
    if (keyword) {
      // 模糊查询 username
      queryFilter.username = Like(`%${keyword}%`);
    }
    const res = await this.brandRepository.findAndCount({
      // 查询条件
      where: queryFilter,
      // 排序
      order: { sort: 'DESC' },
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
