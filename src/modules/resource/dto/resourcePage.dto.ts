import { BasePageDto } from '@src/common/BasePageDto';
import { IsNotEmpty, IsOptional } from 'class-validator';
export class ResourcePageDto extends BasePageDto {
  @IsOptional()
  categoryId: number;
  @IsOptional()
  nameKeyword: string;
  @IsOptional()
  urlKeyword: string;
}
