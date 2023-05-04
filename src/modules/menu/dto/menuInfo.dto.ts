import { ApiProperty } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class MenuInfoDto {
  @ApiProperty({ type: Number, description: '是否显示 1显示 0不显示' })
  @Type(() => Number)
  @IsNumber()
  hidden: number;

  @ApiProperty({ type: String, description: '图标' })
  @IsNotEmpty({ message: 'icon不能为空' })
  @IsString()
  icon: string;

  @ApiProperty({ type: String, description: '前端名称' })
  @IsNotEmpty({ message: 'name不能为空' })
  @IsString()
  name: string;

  @ApiProperty({ type: Number, description: 'parentId' })
  @IsNotEmpty({ message: 'parentId不能为空' })
  @IsNumber()
  @Type(() => Number)
  parentId: number;

  @ApiProperty({ type: Number, description: 'sort' })
  @IsNotEmpty({ message: 'sort不能为空' })
  @IsNumber()
  @Type(() => Number)
  sort: number;

  @ApiProperty({ type: Number, description: '菜单名称' })
  @IsNotEmpty({ message: 'title不能为空' })
  @IsString()
  title: string;
}
