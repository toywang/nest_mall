import { Module } from '@nestjs/common';
import { CouponHistoryService } from './coupon-history.service';
import { CouponHistoryController } from './coupon-history.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CouponHistory } from './entities/coupon-history.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CouponHistory])],
  controllers: [CouponHistoryController],
  providers: [CouponHistoryService],
})
export class CouponHistoryModule {}
