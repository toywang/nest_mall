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
import { CouponService } from './coupon.service';
import { CreateCouponDto } from './dto/create-coupon.dto';
import { UpdateCouponDto } from './dto/update-coupon.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CouponSearchDto } from './dto/coupon-search.dto';
import { CommonResult } from '@src/common/CommonResult';
import { EntityManager, Transaction, TransactionManager } from 'typeorm';

@ApiTags('优惠券管理')
@Controller('coupon')
export class CouponController {
  constructor(private readonly couponService: CouponService) {}

  @Post('create')
  @Transaction()
  create(
    @Body() createCouponDto: CreateCouponDto,
    @TransactionManager() maneger: EntityManager,
  ) {
    return this.couponService.create(createCouponDto, maneger);
  }

  @ApiOperation({
    summary: '查询优惠券列表',
  })
  @Get('list')
  async findAll(@Query() searchDto: CouponSearchDto) {
    const list = await this.couponService.getPageList(searchDto);
    const result = CommonResult.pageData(
      list,
      searchDto.pageNum,
      searchDto.pageSize,
    );
    return result;
  }

  @ApiOperation({
    summary: '查询优惠券详情',
  })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.couponService.findOne(id);
  }

  @ApiOperation({
    summary: '更新优惠券',
  })
  @Post('/update/:id')
  @Transaction()
  update(
    @Param('id') id: string,
    @Body() updateCouponDto: UpdateCouponDto,
    @TransactionManager() maneger: EntityManager,
  ) {
    return this.couponService.update(id, updateCouponDto, maneger);
  }

  @ApiOperation({
    summary: '删除优惠券',
  })
  @Post('/delete/:id')
  remove(@Param('id') id: string) {
    return this.couponService.remove(id);
  }
}
