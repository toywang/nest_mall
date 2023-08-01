import { Injectable } from '@nestjs/common';
import { CreateProductAttributeCategoryDto } from './dto/create-product-attribute-category.dto';
import { UpdateProductAttributeCategoryDto } from './dto/update-product-attribute-category.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductAttributeCategory } from './entities/product-attribute-category.entity';
import { Repository } from 'typeorm';
import { BasePageDto } from '@src/common/BasePageDto';

@Injectable()
export class ProductAttributeCategoryService {
  constructor(
    @InjectRepository(ProductAttributeCategory)
    private pacRepository: Repository<ProductAttributeCategory>,
  ) {}

  create(createProductAttributeCategoryDto: CreateProductAttributeCategoryDto) {
    return 'This action adds a new productAttributeCategory';
  }
  /**
   * 分页
   * @param dto
   * @returns
   */
  async getPageList(dto: BasePageDto) {
    const { pageSize, pageNum } = dto;
    const res = await this.pacRepository.findAndCount({
      // 查询条件
      // offset，分页的偏移量
      skip: (pageNum - 1) * pageSize,
      // 每页条数
      take: pageSize,
      // 是否缓存
      cache: true,
    });
    return res;
  }

  findOne(id: number) {
    return `This action returns a #${id} productAttributeCategory`;
  }

  update(
    id: number,
    updateProductAttributeCategoryDto: UpdateProductAttributeCategoryDto,
  ) {
    return `This action updates a #${id} productAttributeCategory`;
  }

  remove(id: number) {
    return `This action removes a #${id} productAttributeCategory`;
  }
}
