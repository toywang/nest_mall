import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductAttributeCategory } from './entities/product-attribute-category.entity';
import { Repository } from 'typeorm';
import { BasePageDto } from '@src/common/BasePageDto';
import { CommonResult } from '@src/common/CommonResult';

@Injectable()
export class ProductAttributeCategoryService {
  constructor(
    @InjectRepository(ProductAttributeCategory)
    private pacRepository: Repository<ProductAttributeCategory>,
  ) {}

  async create(caName: string) {
    const result = await this.pacRepository.findOne({ name: caName });
    if (result) {
      throw new HttpException('名称已经存在', HttpStatus.BAD_REQUEST);
    }

    const newM = new ProductAttributeCategory();
    newM.attributeCount = 0;
    newM.paramCount = 0;
    newM.name = caName;
    return await this.pacRepository.save(newM);
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

  /**
   * 获取所有商品属性分类及其下属性
   * @returns
   */
  async getAttrilist() {
    const sql = await this.pacRepository
      .createQueryBuilder('pac')
      .leftJoinAndSelect('pac.productAttributeList', 'productAttributeList')
      .printSql()
      .getMany();
    return sql;
  }

  /**
   * 修改
   * @returns
   */
  async updateAttribute(id: number, name: string) {
    const result = await this.pacRepository.findOne({ id: id });

    result.name = name;
    return await this.pacRepository.save(result);
  }

  /**
   * 删除
   * @returns
   */
  async deleteAttribute(id: number) {
    const result = await this.pacRepository.delete({ id: id });

    return result;
  }
}
