import { BasePageDto } from '@src/common/BasePageDto';
import { IsNotEmpty, IsOptional } from 'class-validator';
export class CouponSearchDto extends BasePageDto {
  @IsOptional()
  type: number;

  @IsOptional()
  name: string;
}
