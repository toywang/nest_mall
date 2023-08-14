import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateOrderSettingDto {
  @ApiProperty({ type: Number, description: '秒杀订单超时关闭时间(分)' })
  @IsNumber()
  @Type(() => Number)
  flashOrderOvertime: number;

  @ApiProperty({ type: Number, description: '正常订单超时时间(分)' })
  @IsNumber()
  @Type(() => Number)
  normalOrderOvertime: number;

  @ApiProperty({ type: Number, description: '发货后自动确认收货时间（天）' })
  @IsNumber()
  @Type(() => Number)
  confirmOvertime: number;

  @ApiProperty({
    type: Number,
    description: '自动完成交易时间，不能申请售后（天）',
  })
  @IsNumber()
  @Type(() => Number)
  finishOvertime: number;

  @ApiProperty({ type: Number, description: '订单完成后自动好评时间（天）' })
  @IsNumber()
  @Type(() => Number)
  commentOvertime: number;
}
