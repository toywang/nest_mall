import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { BasePageDto } from '@src/common/BasePageDto';
import { Product } from './entities/product.entity';
import { EntityManager, Like, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductCategory } from '../product-category/entities/product-category.entity';
import { CreateProductDto } from './dto/create-product.dto';
import { ProductLadder } from './entities/product-ladder.entity';
import { SkuStock } from './entities/sku-stock.entity';
import { MemberPrice } from './entities/member-price.entity';
import { ProductAttribute } from '../product-attribute/entities/product-attribute.entity';
import { ProductFullReduction } from './entities/product-full-reduction.entity';
import { PrefrenceArea } from '../prefrence-area/entities/prefrence-area.entity';
import { PrefrenceAreaProductRelation } from './entities/prefrence-area-product-relation.entity';
import { SubjectProductRelation } from './entities/subject-product-relation.entity';
import { ProductAttributeValue } from './entities/product-attribute-value.entity';

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
      .leftJoinAndSelect('p.productLadderList', 'productLadderList')
      .leftJoinAndSelect('p.skuStockList', 'skuStockList')
      .leftJoinAndSelect(
        'p.productAttributeValueList',
        'productAttributeValueList',
      )
      .leftJoinAndSelect('p.memberPriceList', 'memberPriceList')
      .leftJoinAndSelect(
        'p.productFullReductionList',
        'productFullReductionList',
      )
      .leftJoinAndSelect(
        'p.prefrenceAreaProductRelationList',
        'prefrenceAreaProductRelationList',
      )
      .leftJoinAndSelect(
        'p.subjectProductRelationList',
        'subjectProductRelationList',
      )
      .where('p.id = :id', { id: productId })
      .printSql()
      .getOne();

    return sql;
  }
  /**
   * 新建 产品
   * @param dto
   * @returns
   */
  async createProduct(productInfo: CreateProductDto, manager: EntityManager) {
    try {
      const prInfo = { ...productInfo };
      delete prInfo.verifyStatus;
      delete prInfo.skuStockList;
      delete prInfo.memberPriceList;
      delete prInfo.productLadderList;
      delete prInfo.productAttributeValueList;
      delete prInfo.prefrenceAreaProductRelationList;
      delete prInfo.productFullReductionList;
      delete prInfo.subjectProductRelationList;

      // const updated = Object.assign(toUpdate, productInfo);
      console.log('proRes', prInfo);

      const productRes: any = await manager.create(Product, prInfo);
      const productId = productRes.id;
      //阶梯价格
      if (productInfo.productLadderList.length > 0) {
        const ladderIds = productInfo.productLadderList
          .filter((value) => value.id)
          .map((value) => value.id);
        console.log('ladderIds', ladderIds);
        if (ladderIds.length > 0) {
          await manager.delete(ProductLadder, ladderIds);
        }
        const ladderList = productInfo.productLadderList.map((value) => {
          value.productId = productId;
          return value;
        });
        await manager.insert(ProductLadder, ladderList);
      }

      //sku
      if (productInfo.skuStockList.length > 0) {
        const skuIds = productInfo.skuStockList
          .filter((value) => value.id)
          .map((value) => value.id);
        if (skuIds.length > 0) {
          await manager.delete(SkuStock, skuIds);
        }
        const skuList = productInfo.skuStockList.map((value) => {
          value.productId = productId;
          return value;
        });
        console.log('skuIds', skuList);

        await manager.insert(SkuStock, skuList);
      }

      //会员价
      if (productInfo.memberPriceList.length > 0) {
        const mpIds = productInfo.memberPriceList
          .filter((value) => value.id)
          .map((value) => value.id);
        if (mpIds.length > 0) {
          await manager.delete(MemberPrice, mpIds);
        }
        const memberList = productInfo.memberPriceList.map((value) => {
          value.productId = productId;
          return value;
        });
        await manager.insert(MemberPrice, memberList);
      }

      //属性
      if (productInfo.productAttributeValueList.length > 0) {
        const attributeIds = productInfo.productAttributeValueList
          .filter((value) => value.id)
          .map((value) => value.id);
        if (attributeIds.length > 0) {
          await manager.delete(ProductAttributeValue, attributeIds);
        }
        const attributeList = productInfo.productAttributeValueList.map(
          (value) => {
            value.productId = productId;
            return value;
          },
        );
        await manager.insert(ProductAttributeValue, attributeList);
      }

      //fullReduction
      if (productInfo.productFullReductionList.length > 0) {
        const fullReductionIds = productInfo.productFullReductionList
          .filter((value) => value.id)
          .map((value) => value.id);
        if (fullReductionIds.length > 0) {
          await manager.delete(ProductFullReduction, fullReductionIds);
        }
        const fullList = productInfo.productFullReductionList.map((value) => {
          value.productId = productId;
          return value;
        });
        await manager.insert(ProductFullReduction, fullList);
      }

      //arearelation
      if (productInfo.prefrenceAreaProductRelationList.length > 0) {
        const arearelationIds = productInfo.prefrenceAreaProductRelationList
          .filter((value) => value.id)
          .map((value) => value.id);
        if (arearelationIds.length > 0) {
          await manager.delete(PrefrenceAreaProductRelation, arearelationIds);
        }
        const aareaList = productInfo.prefrenceAreaProductRelationList.map(
          (value) => {
            value.productId = productId;
            return value;
          },
        );
        await manager.insert(PrefrenceAreaProductRelation, aareaList);
      }

      //subject relation
      if (productInfo.subjectProductRelationList.length > 0) {
        const subjectRelationIds = productInfo.subjectProductRelationList
          .filter((value) => value.id)
          .map((value) => value.id);
        if (subjectRelationIds.length > 0) {
          await manager.delete(SubjectProductRelation, subjectRelationIds);
        }
        const subList = productInfo.subjectProductRelationList.map((value) => {
          value.productId = productId;
          return value;
        });
        await manager.insert(SubjectProductRelation, subList);
      }

      return '创建成功';
    } catch (error) {
      console.log('新建产品信息出错', error);

      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }
  /**
   * 更新 产品
   * @param dto
   * @returns
   */
  async updateProductById(
    productId: number,
    productInfo: CreateProductDto,
    manager: EntityManager,
  ) {
    try {
      // prInfo
      // const toUpdate = await this.pmsRepository.findOne({ id: productId });
      const prInfo = { ...productInfo };
      delete prInfo.verifyStatus;
      delete prInfo.skuStockList;
      delete prInfo.memberPriceList;
      delete prInfo.productLadderList;
      delete prInfo.productAttributeValueList;
      delete prInfo.prefrenceAreaProductRelationList;
      delete prInfo.productFullReductionList;
      delete prInfo.subjectProductRelationList;

      // const updated = Object.assign(toUpdate, productInfo);
      console.log('proRes', prInfo);

      await manager.update(Product, { id: productId }, prInfo);
      //阶梯价格
      if (productInfo.productLadderList.length > 0) {
        const ladderIds = productInfo.productLadderList
          .filter((value) => value.id)
          .map((value) => value.id);
        console.log('ladderIds', ladderIds);
        if (ladderIds.length > 0) {
          await manager.delete(ProductLadder, ladderIds);
        }
        const ladderList = productInfo.productLadderList.map((value) => {
          value.productId = productId;
          return value;
        });
        await manager.insert(ProductLadder, ladderList);
      }

      //sku
      if (productInfo.skuStockList.length > 0) {
        const skuIds = productInfo.skuStockList
          .filter((value) => value.id)
          .map((value) => value.id);
        if (skuIds.length > 0) {
          await manager.delete(SkuStock, skuIds);
        }
        const skuList = productInfo.skuStockList.map((value) => {
          value.productId = productId;
          return value;
        });
        console.log('skuIds', skuList);

        await manager.insert(SkuStock, skuList);
      }

      //会员价
      if (productInfo.memberPriceList.length > 0) {
        const mpIds = productInfo.memberPriceList
          .filter((value) => value.id)
          .map((value) => value.id);
        if (mpIds.length > 0) {
          await manager.delete(MemberPrice, mpIds);
        }
        const memberList = productInfo.memberPriceList.map((value) => {
          value.productId = productId;
          return value;
        });
        await manager.insert(MemberPrice, memberList);
      }

      //属性
      if (productInfo.productAttributeValueList.length > 0) {
        const attributeIds = productInfo.productAttributeValueList
          .filter((value) => value.id)
          .map((value) => value.id);
        if (attributeIds.length > 0) {
          await manager.delete(ProductAttributeValue, attributeIds);
        }
        const attributeList = productInfo.productAttributeValueList.map(
          (value) => {
            value.productId = productId;
            return value;
          },
        );
        await manager.insert(ProductAttributeValue, attributeList);
      }

      //fullReduction
      if (productInfo.productFullReductionList.length > 0) {
        const fullReductionIds = productInfo.productFullReductionList
          .filter((value) => value.id)
          .map((value) => value.id);
        if (fullReductionIds.length > 0) {
          await manager.delete(ProductFullReduction, fullReductionIds);
        }
        const fullList = productInfo.productFullReductionList.map((value) => {
          value.productId = productId;
          return value;
        });
        await manager.insert(ProductFullReduction, fullList);
      }

      //arearelation
      if (productInfo.prefrenceAreaProductRelationList.length > 0) {
        const arearelationIds = productInfo.prefrenceAreaProductRelationList
          .filter((value) => value.id)
          .map((value) => value.id);
        if (arearelationIds.length > 0) {
          await manager.delete(PrefrenceAreaProductRelation, arearelationIds);
        }
        const aareaList = productInfo.prefrenceAreaProductRelationList.map(
          (value) => {
            value.productId = productId;
            return value;
          },
        );
        await manager.insert(PrefrenceAreaProductRelation, aareaList);
      }

      //subject relation
      if (productInfo.subjectProductRelationList.length > 0) {
        const subjectRelationIds = productInfo.subjectProductRelationList
          .filter((value) => value.id)
          .map((value) => value.id);
        if (subjectRelationIds.length > 0) {
          await manager.delete(SubjectProductRelation, subjectRelationIds);
        }
        const subList = productInfo.subjectProductRelationList.map((value) => {
          value.productId = productId;
          return value;
        });
        await manager.insert(SubjectProductRelation, subList);
      }

      return '更新成功';
    } catch (error) {
      console.log('更新产品信息出错', error);

      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }

    // prInfo = { ...productInfo };

    // prInfo.name = productInfo.name;
    // prInfo.brandId = productInfo.brandId;
    // prInfo.productCategoryId = productInfo.productCategoryId;
    // prInfo.feightTemplateId = productInfo.feightTemplateId;
    // prInfo.productAttributeCategoryId = productInfo.productAttributeCategoryId;
    // prInfo.pic = productInfo.pic;
    // prInfo.productSn = productInfo.productSn;
    // prInfo.publishStatus = productInfo.publishStatus;
    // prInfo.newStatus = productInfo.newStatus;
    // prInfo.recommandStatus = productInfo.recommandStatus;
    // prInfo.verifyStatus = productInfo.verifyStatus;
    // prInfo.sale = productInfo.sale;
    // prInfo.sort = productInfo.sort;
    // prInfo.price = productInfo.price;
    // prInfo.promotionPrice = productInfo.promotionPrice;
    // prInfo.originalPrice = productInfo.originalPrice;
    // prInfo.stock = productInfo.stock;
    // prInfo.lowStock = productInfo.lowStock;
    // prInfo.unit = productInfo.unit;
    // prInfo.weight = productInfo.weight;
    // prInfo.giftGrowth = productInfo.giftGrowth;
    // prInfo.giftPoint = productInfo.giftPoint;
    // prInfo.usePointLimit = productInfo.usePointLimit;
    // prInfo.subTitle = productInfo.subTitle;
    // prInfo.description = productInfo.description;
    // prInfo.previewStatus = productInfo.previewStatus;
    // prInfo.serviceIds = productInfo.serviceIds;
  }

  /**
   * 查询 产品列表
   * @param dto
   * @returns
   */
  async getProductList(dto: BasePageDto) {
    const { keyword, pageSize, pageNum } = dto;
    const queryFilter: any = {};
    queryFilter.deleteStatus = 0;
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
