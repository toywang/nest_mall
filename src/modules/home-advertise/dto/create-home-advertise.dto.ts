import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateHomeAdvertiseDto {
  @ApiProperty({
    type: String,
    description: '名称',
  })
  @IsOptional()
  @IsString()
  name: string;

  @ApiProperty({
    type: Number,
    description: '轮播位置：0->PC首页轮播；1->app首页轮播',
  })
  @IsOptional()
  @IsNumber()
  type: number;

  @ApiProperty({
    type: Number,
    description: '图片',
  })
  @IsOptional()
  @IsString()
  pic: string;

  @ApiProperty({
    type: Date,
    description: '时间',
  })
  @IsOptional()
  @IsDateString()
  startTime: Date;

  @ApiProperty({
    type: Date,
    description: '时间',
  })
  @IsOptional()
  @IsDateString()
  endTime: Date;

  @ApiProperty({
    type: Number,
    description: '上下线状态：0->下线；1->上线',
  })
  @IsOptional()
  @IsNumber()
  status: number;

  @ApiProperty({
    type: String,
    description: '链接地址',
  })
  @IsOptional()
  @IsString()
  url: string;

  @ApiProperty({
    type: String,
    description: '备注',
  })
  @IsOptional()
  @IsString()
  note: string;

  @ApiProperty({
    type: Number,
    description: '',
  })
  @IsOptional()
  @IsNumber()
  sort: number;
}
