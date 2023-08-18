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
import { FlashService } from './flash.service';
import { CreateFlashDto } from './dto/create-flash.dto';
import { UpdateFlashDto } from './dto/update-flash.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { BasePageDto } from '@src/common/BasePageDto';
import { CommonResult } from '@src/common/CommonResult';

@ApiTags('限时购活动管理')
@Controller('flash')
export class FlashController {
  constructor(private readonly flashService: FlashService) {}

  // @Post('create')
  // @Transaction()
  // create(
  //   @Body() createCouponDto: CreateCouponDto,
  //   @TransactionManager() maneger: EntityManager,
  // ) {
  //   return this.couponService.create(createCouponDto, maneger);
  // }

  @ApiOperation({
    summary: '查询列表',
  })
  @Get('list')
  async findAll(@Query() searchDto: BasePageDto) {
    const list = await this.flashService.getPageList(searchDto);
    const result = CommonResult.pageData(
      list,
      searchDto.pageNum,
      searchDto.pageSize,
    );
    return result;
  }

  @ApiOperation({
    summary: '查询详情',
  })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.flashService.findOne(id);
  }

  // @ApiOperation({
  //   summary: '更新优惠券',
  // })
  // @Post('/update/:id')
  // @Transaction()
  // update(
  //   @Param('id') id: string,
  //   @Body() updateCouponDto: UpdateCouponDto,
  //   @TransactionManager() maneger: EntityManager,
  // ) {
  //   return this.couponService.update(id, updateCouponDto, maneger);
  // }

  @ApiOperation({
    summary: '删除',
  })
  @Post('/delete/:id')
  remove(@Param('id') id: string) {
    return this.flashService.remove(id);
  }
}
