import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { CouponHistoryService } from './coupon-history.service';
import { CreateCouponHistoryDto } from './dto/create-coupon-history.dto';
import { UpdateCouponHistoryDto } from './dto/update-coupon-history.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CouponHistorySearchDto } from './dto/coupon-history-search.dto';
import { CommonResult } from '@src/common/CommonResult';

@ApiTags('优惠券领取记录管理')
@Controller('couponHistory')
export class CouponHistoryController {
  constructor(private readonly couponHistoryService: CouponHistoryService) {}

  @ApiOperation({
    summary: '根据优惠券id，使用状态，订单编号分页获取领取记录',
  })
  @Get('list')
  async findAll(@Query() search: CouponHistorySearchDto) {
    const list = await this.couponHistoryService.getPageList(search);
    const result = CommonResult.pageData(list, search.pageNum, search.pageSize);
    return result;
  }
}
