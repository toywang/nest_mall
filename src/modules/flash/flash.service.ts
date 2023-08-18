import { Injectable } from '@nestjs/common';
import { CreateFlashDto } from './dto/create-flash.dto';
import { UpdateFlashDto } from './dto/update-flash.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Flash } from './entities/flash.entity';
import { Like, Repository } from 'typeorm';
import { BasePageDto } from '@src/common/BasePageDto';

@Injectable()
export class FlashService {
  constructor(
    @InjectRepository(Flash)
    private flashRepository: Repository<Flash>,
  ) {}

  // async create(createCouponDto: CreateCouponDto, manager: EntityManager) {
  //   try {
  //     const newCoupon: Coupon = new Coupon();
  //     newCoupon.type = createCouponDto.type;
  //     newCoupon.name = createCouponDto.name;
  //     newCoupon.platform = createCouponDto.platform;
  //     newCoupon.publishCount = createCouponDto.publishCount;
  //     newCoupon.amount = createCouponDto.amount;
  //     newCoupon.perLimit = createCouponDto.perLimit;
  //     newCoupon.minPoint = createCouponDto.minPoint;
  //     newCoupon.enableTime = createCouponDto.enableTime;
  //     newCoupon.startTime = createCouponDto.startTime;
  //     newCoupon.endTime = createCouponDto.endTime;
  //     newCoupon.useType = createCouponDto.useType;
  //     newCoupon.note = createCouponDto.note;
  //     newCoupon.count = createCouponDto.publishCount;
  //     newCoupon.useCount = 0;
  //     newCoupon.receiveCount = 0;
  //     const couponRes = (await manager.insert(Coupon, newCoupon)).identifiers[0]
  //       .id;
  //     console.log('插入优惠券的结果', couponRes, createCouponDto);
  //     if (createCouponDto.useType == 1) {
  //       //分类
  //       createCouponDto.productCategoryRelationList.forEach((value) => {
  //         value.couponId = couponRes;
  //       });
  //       await manager.insert(
  //         CouponProductCategoryRelation,
  //         createCouponDto.productCategoryRelationList,
  //       );
  //     }
  //     if (createCouponDto.useType == 2) {
  //       //商品
  //       createCouponDto.productRelationList.forEach((value) => {
  //         value.couponId = couponRes;
  //       });
  //       await manager.insert(
  //         CouponProductRelation,
  //         createCouponDto.productRelationList,
  //       );
  //     }
  //     return '创建成功';
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }

  /**
   * 查询
   * @param dto
   * @returns
   */
  async getPageList(dto: BasePageDto) {
    const { keyword, pageSize, pageNum } = dto;
    const queryFilter: any = {};
    if (keyword) {
      queryFilter.title = Like(`%${keyword}%`);
    }

    const res = await this.flashRepository.findAndCount({
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
    return await this.flashRepository.findOne({ id: id });
  }

  // async update(
  //   id: string,
  //   createCouponDto: UpdateCouponDto,
  //   manager: EntityManager,
  // ) {
  //   try {
  //     const newCoupon: Coupon = new Coupon();
  //     newCoupon.id = id;
  //     newCoupon.type = createCouponDto.type;
  //     newCoupon.name = createCouponDto.name;
  //     newCoupon.platform = createCouponDto.platform;
  //     newCoupon.publishCount = createCouponDto.publishCount;
  //     newCoupon.amount = createCouponDto.amount;
  //     newCoupon.perLimit = createCouponDto.perLimit;
  //     newCoupon.minPoint = createCouponDto.minPoint;
  //     newCoupon.enableTime = createCouponDto.enableTime;
  //     newCoupon.startTime = createCouponDto.startTime;
  //     newCoupon.endTime = createCouponDto.endTime;
  //     newCoupon.useType = createCouponDto.useType;
  //     newCoupon.note = createCouponDto.note;
  //     newCoupon.count = createCouponDto.publishCount;
  //     newCoupon.useCount = 0;
  //     newCoupon.receiveCount = 0;
  //     const couponRes = await manager.update(Coupon, id, newCoupon);
  //     console.log('更新优惠券的结果', couponRes, createCouponDto);
  //     let cateRes = {};

  //     if (createCouponDto.useType == 1) {
  //       //分类
  //       createCouponDto.productCategoryRelationList.forEach((value) => {
  //         value.couponId = id;
  //       });
  //       await this.deleteProductCategoryRelation(id);
  //       cateRes = await manager.save(
  //         CouponProductCategoryRelation,
  //         createCouponDto.productCategoryRelationList,
  //       );
  //     }
  //     let proRes = {};
  //     if (createCouponDto.useType == 2) {
  //       //商品
  //       createCouponDto.productRelationList.forEach((value) => {
  //         value.couponId = id;
  //       });
  //       await this.deleteProductRelation(id);
  //       proRes = await manager.save(
  //         CouponProductRelation,
  //         createCouponDto.productRelationList,
  //       );
  //     }
  //     return { couponRes, proRes, cateRes };
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }

  async remove(id: string) {
    const result = await this.flashRepository.delete({ id: id });
    return { result };
  }
}
