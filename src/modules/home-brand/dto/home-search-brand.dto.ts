import { BasePageDto } from '@src/common/BasePageDto';
import { IsNotEmpty, IsOptional } from 'class-validator';
export class HomeSearchBrandDto extends BasePageDto {
  @IsOptional()
  brandName: string;

  @IsOptional()
  recommendStatus: number;
}
