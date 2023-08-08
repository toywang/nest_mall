import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductAttribute } from './entities/product-attribute.entity';

@Injectable()
export class ProductAttributeService {
  constructor(
    @InjectRepository(ProductAttribute)
    private paeRepository: Repository<ProductAttribute>,
  ) {}

  async findAll(cid, pageInfo) {
    const { type, pageSize, pageNum } = pageInfo;
    const queryFilter: any = {};
    queryFilter.type = type;
    queryFilter.productAttributeCategoryId = cid;
    const res = await this.paeRepository.findAndCount({
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
