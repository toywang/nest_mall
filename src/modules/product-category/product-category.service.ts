import { Injectable } from '@nestjs/common';
import { CreateProductCategoryDto } from './dto/create-product-category.dto';
import { UpdateProductCategoryDto } from './dto/update-product-category.dto';
import { ProductCategory } from './entities/product-category.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BasePageDto } from '@src/common/BasePageDto';

@Injectable()
export class ProductCategoryService {
  constructor(
    @InjectRepository(ProductCategory)
    private pcRepository: Repository<ProductCategory>,
  ) {}

  /**
   * 查询 用户列表
   * @param dto
   * @returns
   */
  async getCateList(dto: BasePageDto, level: number) {
    const { keyword, pageSize, pageNum } = dto;
    const queryFilter: any = {};
    if (keyword) {
      // 模糊查询 username
      queryFilter.level = level;
    }
    const res = await this.pcRepository.findAndCount({
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

  /**
   * 查询 产品分类children list
   * @returns
   */
  async getProductCategoryChildList() {
    const menuList = await this.pcRepository.find();
    const result = this.dealTreeData(0, menuList);
    return result;
  }
  dealTreeData(parent_id: number, list: any) {
    const arr = list?.filter((c: any) => c.parentId == parent_id) || [];
    arr.forEach((item: any) => {
      const children: any = this.dealTreeData(item.id, list);
      if (children?.length) {
        item.children = children;
      } else {
        item.children = [];
      }
    });
    return arr;
  }
}
