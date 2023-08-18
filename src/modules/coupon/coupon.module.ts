import { Module } from '@nestjs/common';
import { CouponService } from './coupon.service';
import { CouponController } from './coupon.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Coupon } from './entities/coupon.entity';
import { CouponProductCategoryRelation } from './entities/coupon-product-category-relation.entity';
import { CouponProductRelation } from './entities/coupon-product-relation.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Coupon,
      CouponProductCategoryRelation,
      CouponProductRelation,
    ]),
  ],
  controllers: [CouponController],
  providers: [CouponService],
})
export class CouponModule {}
