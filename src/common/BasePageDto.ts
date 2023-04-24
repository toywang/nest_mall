import { IsNotEmpty, IsOptional } from 'class-validator';
export class BasePageDto {
  @IsNotEmpty()
  pageNum: number;
  @IsNotEmpty()
  pageSize: number;
  @IsOptional() // 必须指定一个类型，否则无法获取值？
  keyword: string;
}
