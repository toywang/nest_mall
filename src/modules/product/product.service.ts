import { Injectable } from '@nestjs/common';
import { BasePageDto } from '@src/common/BasePageDto';
import { Product } from './entities/product.entity';
import { Like, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductCategory } from '../product-category/entities/product-category.entity';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private pmsRepository: Repository<Product>,
  ) {}

  /**
   * 查询 产品详情
   * @param dto
   * @returns
   */
  async getProductById(productId: string) {
    // const sql = await this.pmsRepository
    //   .createQueryBuilder('p')
    //   .leftJoinAndSelect(ProductCategory, 'pc', 'pc.id = p.productCategoryId')
    //   .leftJoinAndSelect('pms_product_ladder', 'l', 'p.id = l.product_id')
    //   .leftJoinAndSelect(
    //     'pms_product_full_reduction',
    //     'pf',
    //     'pf.product_id = p.id',
    //   )
    //   .leftJoinAndSelect('pms_member_price', 'm', 'm.product_id = p.id')
    //   .leftJoinAndSelect('pms_sku_stock', 's', 's.product_id = p.id')
    //   .leftJoinAndSelect(
    //     'pms_product_attribute_value',
    //     'a',
    //     'a.product_id = p.id',
    //   )

    //   .where('p.id = :id', { id: productId })
    //   .select('*')
    //   .addSelect(
    //     `pc.parentId as cateParentId,
    //                 l.id ladder_id,l.product_id ladder_product_id,l.discount ladder_discount,l.count ladder_count,l.price ladder_price,
    //         pf.id full_id,pf.product_id full_product_id,pf.full_price full_full_price,pf.reduce_price full_reduce_price,
    //         m.id member_id,m.product_id member_product_id,m.member_level_id member_member_level_id,m.member_price member_member_price,m.member_level_name member_member_level_name,
    //         s.id sku_id,s.product_id sku_product_id,s.price sku_price,s.promotion_price sku_promotion_price,s.low_stock sku_low_stock,s.pic sku_pic,s.sale sku_sale,s.sku_code sku_sku_code,s.stock sku_stock,s.sp_data sku_sp_data,
    //         a.id attribute_id,a.product_id attribute_product_id,a.product_attribute_id attribute_product_attribute_id,a.value attribute_value
    //   `,
    //   )
    //   .printSql()
    //   .getRawOne();

    const sql = await this.pmsRepository
      .createQueryBuilder('p')
      .leftJoinAndSelect('p.productCategory', 'productCategory')
      .leftJoinAndSelect('p.productLadder', 'productLadderList')
      .leftJoinAndSelect('p.skuStockList', 'skuStockList')
      .leftJoinAndSelect('p.attributeValue', 'productAttributeValueList')
      .leftJoinAndSelect('p.memberPrice', 'memberPriceList')
      .leftJoinAndSelect('p.productFullReduction', 'productFullReductionList')

      .where('p.id = :id', { id: productId })
      .printSql()
      .getOne();
    return sql;
  }

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

  /**
   * 批量上架
   * @param
   * @param
   * @returns
   */
  async batchUpdatePublishStatus(ids: string, publishStatus: number) {
    const idst = ids.split(',');
    const existComment = await this.pmsRepository.findByIds(idst);
    console.log(existComment);
    const updatedComment = [];
    existComment.map((el) => {
      updatedComment.push({ ...el, publishStatus: publishStatus });
    });
    const result = await this.pmsRepository.save(updatedComment);
    return result;
  }

  /**
   * 批量推荐商品
   * @param
   * @param
   * @returns
   */
  async batchUpdateRecommendStatus(ids: string, recommendStatus: number) {
    const idst = ids.split(',');
    const existComment = await this.pmsRepository.findByIds(idst);
    console.log(existComment);
    const updatedComment = [];
    existComment.map((el) => {
      updatedComment.push({ ...el, recommendStatus: recommendStatus });
    });
    const result = await this.pmsRepository.save(updatedComment);
    return result;
  }

  /**
   * 批量设为新品
   * @param
   * @param
   * @returns
   */
  async batchUpdateNewStatus(ids: string, newStatus: number) {
    const idst = ids.split(',');
    const existComment = await this.pmsRepository.findByIds(idst);
    console.log(existComment);
    const updatedComment = [];
    existComment.map((el) => {
      updatedComment.push({ ...el, newStatus: newStatus });
    });
    const result = await this.pmsRepository.save(updatedComment);
    return result;
  }

  /**
   * 批量修改删除状态
   * @param
   * @param
   * @returns
   */
  async batchUpdateDeleteStatus(ids: string, deleteStatus: number) {
    const idst = ids.split(',');
    const existComment = await this.pmsRepository.findByIds(idst);
    console.log(existComment);
    const updatedComment = [];
    existComment.map((el) => {
      updatedComment.push({ ...el, deleteStatus: deleteStatus });
    });
    const result = await this.pmsRepository.save(updatedComment);
    return result;
  }
}
