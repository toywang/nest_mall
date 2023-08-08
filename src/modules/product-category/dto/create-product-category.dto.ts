import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateProductCategoryDto {
  @ApiProperty({ type: Number, description: '上机分类的编号：0表示一级分类' })
  @IsNumber()
  @IsNotEmpty({ message: '上级分类ID不能为空' })
  @Type(() => Number)
  parentId: number;

  @ApiProperty({ type: String, description: '分类名称' })
  @IsString()
  name: string;

  @ApiProperty({ type: String, description: '单位' })
  @IsString()
  @IsOptional()
  productUnit: string;

  @ApiProperty({
    type: Number,
    description: '是否显示在导航栏：0->不显示；1->显示',
  })
  @IsNumber()
  @Type(() => Number)
  navStatus: number;

  @ApiProperty({ type: Number, description: '显示状态：0->不显示；1->显示' })
  @IsNumber()
  @Type(() => Number)
  showStatus: number;

  @ApiProperty({ description: '' })
  @IsNumber()
  @Type(() => Number)
  sort: number;

  @ApiProperty({ type: String, description: '图标' })
  @IsString()
  @IsOptional()
  icon: string;

  @ApiProperty({ type: String, description: '' })
  @IsString()
  @IsOptional()
  keywords: string;

  @ApiProperty({ type: String, description: '描述' })
  @IsString()
  @IsOptional()
  description: string;
}
