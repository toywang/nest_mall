import { BasePageDto } from '@src/common/BasePageDto';
import { IsNotEmpty, IsOptional } from 'class-validator';
export class CouponHistorySearchDto extends BasePageDto {
  @IsOptional()
  couponId: number;

  @IsOptional()
  useStatus: number;

  @IsOptional()
  orderSn: string;
}
