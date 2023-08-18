import { BasePageDto } from '@src/common/BasePageDto';
import { IsNotEmpty, IsOptional } from 'class-validator';
export class ProductSearchDto extends BasePageDto {
  @IsOptional()
  productName: string;

  @IsOptional()
  recommendStatus: number;
}
