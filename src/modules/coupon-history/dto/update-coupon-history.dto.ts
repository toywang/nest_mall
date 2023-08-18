import { PartialType } from '@nestjs/mapped-types';
import { CreateCouponHistoryDto } from './create-coupon-history.dto';

export class UpdateCouponHistoryDto extends PartialType(CreateCouponHistoryDto) {}
