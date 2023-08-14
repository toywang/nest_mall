import { ApiProperty } from '@nestjs/swagger';
import { BasePageDto } from '@src/common/BasePageDto';
import { IsNotEmpty, IsOptional } from 'class-validator';
export class OrderSearchDto extends BasePageDto {
  @IsNotEmpty()
  pageNum: number;

  @IsNotEmpty()
  pageSize: number;

  @ApiProperty({ description: '订单编号' })
  @IsOptional()
  orderSn: number;

  @ApiProperty({ description: '收货人' })
  @IsOptional()
  receiverKeyword: string;

  @ApiProperty({
    description:
      '订单状态0->待付款；1->待发货；2->已发货；3->已完成；4->已关闭；5->无效订单',
  })
  @IsOptional()
  status: number;

  @ApiProperty({ description: '订单分类 0->正常订单；1->秒杀订单' })
  @IsOptional()
  orderType: number;

  @ApiProperty({ description: '订单来源 0->PC订单；1->app订单' })
  @IsOptional()
  sourceType: number;

  @ApiProperty({ description: '下单时间' })
  @IsOptional()
  createTime: string;
}
