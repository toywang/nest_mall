import { Injectable } from '@nestjs/common';
import { CreateCouponDto } from './dto/create-coupon.dto';
import { UpdateCouponDto } from './dto/update-coupon.dto';
import { CouponSearchDto } from './dto/coupon-search.dto';
import { EntityManager, InsertResult, Like, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Coupon } from './entities/coupon.entity';
import { CouponProductCategoryRelation } from './entities/coupon-product-category-relation.entity';
import { CouponProductRelation } from './entities/coupon-product-relation.entity';

@Injectable()
export class CouponService {
  constructor(
    @InjectRepository(Coupon)
    private cpRepository: Repository<Coupon>,
    @InjectRepository(CouponProductCategoryRelation)
    private cpcrRepository: Repository<CouponProductCategoryRelation>,
    @InjectRepository(CouponProductRelation)
    private cprRepository: Repository<CouponProductRelation>,
  ) {}

  async create(createCouponDto: CreateCouponDto, manager: EntityManager) {
    try {
      const newCoupon: Coupon = new Coupon();
      newCoupon.type = createCouponDto.type;
      newCoupon.name = createCouponDto.name;
      newCoupon.platform = createCouponDto.platform;
      newCoupon.publishCount = createCouponDto.publishCount;
      newCoupon.amount = createCouponDto.amount;
      newCoupon.perLimit = createCouponDto.perLimit;
      newCoupon.minPoint = createCouponDto.minPoint;
      newCoupon.enableTime = createCouponDto.enableTime;
      newCoupon.startTime = createCouponDto.startTime;
      newCoupon.endTime = createCouponDto.endTime;
      newCoupon.useType = createCouponDto.useType;
      newCoupon.note = createCouponDto.note;
      newCoupon.count = createCouponDto.publishCount;
      newCoupon.useCount = 0;
      newCoupon.receiveCount = 0;
      const couponRes = (await manager.insert(Coupon, newCoupon)).identifiers[0]
        .id;
      console.log('插入优惠券的结果', couponRes, createCouponDto);
      if (createCouponDto.useType == 1) {
        //分类
        createCouponDto.productCategoryRelationList.forEach((value) => {
          value.couponId = couponRes;
        });
        await manager.insert(
          CouponProductCategoryRelation,
          createCouponDto.productCategoryRelationList,
        );
      }
      if (createCouponDto.useType == 2) {
        //商品
        createCouponDto.productRelationList.forEach((value) => {
          value.couponId = couponRes;
        });
        await manager.insert(
          CouponProductRelation,
          createCouponDto.productRelationList,
        );
      }
      return '创建成功';
    } catch (error) {
      console.log(error);
    }
  }

  /**
   * 查询
   * @param dto
   * @returns
   */
  async getPageList(dto: CouponSearchDto) {
    const { name, type, pageSize, pageNum } = dto;
    const queryFilter: any = {};
    if (name) {
      // 模糊查询 username
      queryFilter.name = Like(`%${name}%`);
    }
    if (type) {
      // 模糊查询 username
      queryFilter.type = type;
    }
    const res = await this.cpRepository.findAndCount({
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

  async findOne(id: string) {
    const sql = await this.cpRepository
      .createQueryBuilder('p')
      .leftJoinAndSelect('p.productRelationList', 'productRelationList')
      .leftJoinAndSelect(
        'p.productCategoryRelationList',
        'productCategoryRelationList',
      )
      .where('p.id = :id', { id: id })
      .printSql()
      .getOne();

    return sql;
  }

  async update(
    id: string,
    createCouponDto: UpdateCouponDto,
    manager: EntityManager,
  ) {
    try {
      const newCoupon: Coupon = new Coupon();
      newCoupon.id = id;
      newCoupon.type = createCouponDto.type;
      newCoupon.name = createCouponDto.name;
      newCoupon.platform = createCouponDto.platform;
      newCoupon.publishCount = createCouponDto.publishCount;
      newCoupon.amount = createCouponDto.amount;
      newCoupon.perLimit = createCouponDto.perLimit;
      newCoupon.minPoint = createCouponDto.minPoint;
      newCoupon.enableTime = createCouponDto.enableTime;
      newCoupon.startTime = createCouponDto.startTime;
      newCoupon.endTime = createCouponDto.endTime;
      newCoupon.useType = createCouponDto.useType;
      newCoupon.note = createCouponDto.note;
      newCoupon.count = createCouponDto.publishCount;
      newCoupon.useCount = 0;
      newCoupon.receiveCount = 0;
      const couponRes = await manager.update(Coupon, id, newCoupon);
      console.log('更新优惠券的结果', couponRes, createCouponDto);
      let cateRes = {};

      if (createCouponDto.useType == 1) {
        //分类
        createCouponDto.productCategoryRelationList.forEach((value) => {
          value.couponId = id;
        });
        await this.deleteProductCategoryRelation(id);
        cateRes = await manager.save(
          CouponProductCategoryRelation,
          createCouponDto.productCategoryRelationList,
        );
      }
      let proRes = {};
      if (createCouponDto.useType == 2) {
        //商品
        createCouponDto.productRelationList.forEach((value) => {
          value.couponId = id;
        });
        await this.deleteProductRelation(id);
        proRes = await manager.save(
          CouponProductRelation,
          createCouponDto.productRelationList,
        );
      }
      return { couponRes, proRes, cateRes };
    } catch (error) {
      console.log(error);
    }
  }
  async deleteProductRelation(id: string) {
    const product = await this.cprRepository.delete({ couponId: id });
    return product;
  }
  async deleteProductCategoryRelation(id: string) {
    const cate = await this.cpcrRepository.delete({ couponId: id });
    return cate;
  }
  async remove(id: string) {
    const counpon = await this.cpRepository.delete({ id: id });
    const cate = this.deleteProductCategoryRelation(id);
    const product = this.deleteProductRelation(id);
    return { counpon, cate, product };
  }
}
