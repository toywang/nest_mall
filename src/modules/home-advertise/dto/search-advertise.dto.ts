import { BasePageDto } from '@src/common/BasePageDto';
import { IsNotEmpty, IsOptional } from 'class-validator';
export class SearchAdvertiseDto extends BasePageDto {
  @IsOptional()
  name: string;

  @IsOptional()
  type: number;

  @IsOptional()
  endTime: string;
}
