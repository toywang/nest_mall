import { ApiProperty } from '@nestjs/swagger';
import { BasePageDto } from '@src/common/BasePageDto';
import { IsNotEmpty, IsOptional } from 'class-validator';
export class ReceiverInfo {
  @ApiProperty({ description: '订单id' })
  @IsNotEmpty()
  orderId: string;

  @ApiProperty({ description: '收货人' })
  @IsNotEmpty()
  receiverName: string;

  @ApiProperty({
    description: '收货人电话',
  })
  @IsNotEmpty()
  receiverPhone: string;

  @ApiProperty({
    description: '收货人邮编',
  })
  @IsNotEmpty()
  receiverPostCode: string;

  @ApiProperty({
    description: '详细地址',
  })
  @IsNotEmpty()
  receiverDetailAddress: string;

  @ApiProperty({
    description: '省份/直辖市',
  })
  @IsNotEmpty()
  receiverProvince: string;

  @ApiProperty({
    description: '城市',
  })
  @IsNotEmpty()
  receiverCity: string;

  @ApiProperty({
    description: '区',
  })
  @IsNotEmpty()
  receiverRegion: string;

  @ApiProperty({
    description: 'status',
  })
  @IsNotEmpty()
  status: number;
}
