import { BasePageDto } from '@src/common/BasePageDto';
import { IsNotEmpty, IsOptional } from 'class-validator';
export class SearchDto extends BasePageDto {
  @IsNotEmpty()
  pageNum: number;

  @IsNotEmpty()
  pageSize: number;

  @IsOptional()
  id: number;

  @IsOptional()
  status: number;

  @IsOptional()
  createTime: string;

  @IsOptional()
  handleMan: string;

  @IsOptional()
  handleTime: string;
}
