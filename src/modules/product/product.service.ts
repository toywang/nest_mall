import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { BasePageDto } from '@src/common/BasePageDto';
import { Product } from './entities/product.entity';
import { Like, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private pmsRepository: Repository<Product>,
  ) {}

  /**
   * 查询 产品列表
   * @param dto
   * @returns
   */
  async getProductList(dto: BasePageDto) {
    const { keyword, pageSize, pageNum } = dto;
    const queryFilter: any = {};
    if (keyword) {
      // 模糊查询 username
      queryFilter.username = Like(`%${keyword}%`);
    }
    const res = await this.pmsRepository.findAndCount({
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
