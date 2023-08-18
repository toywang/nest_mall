import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Query,
  Request,
} from '@nestjs/common';
import { HomeAdvertiseService } from './home-advertise.service';
import { CreateHomeAdvertiseDto } from './dto/create-home-advertise.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { SearchAdvertiseDto } from './dto/search-advertise.dto';
import { CommonResult } from '@src/common/CommonResult';
import { UpdateHomeAdvertiseDto } from './dto/update-home-advertise.dto';

@ApiTags('首页轮播广告管理')
@Controller('/home/advertise')
export class HomeAdvertiseController {
  constructor(private readonly homeAdvertiseService: HomeAdvertiseService) {}
  @ApiOperation({
    summary: '添加首页广告',
  })
  @Post('create')
  create(@Body() newAd: CreateHomeAdvertiseDto) {
    return this.homeAdvertiseService.create(newAd);
  }

  @ApiOperation({
    summary: '首页推荐列表',
  })
  @Get('list')
  async findAll(@Query() query: SearchAdvertiseDto) {
    const list = await this.homeAdvertiseService.getPageList(query);
    const result = CommonResult.pageData(list, query.pageNum, query.pageSize);
    return result;
  }

  @ApiOperation({
    summary: '详情',
  })
  @Get(':id')
  async findDetail(@Param('id') id: string) {
    const result = await this.homeAdvertiseService.findOne(id);
    return result;
  }

  @ApiOperation({
    summary: '修改上下线状态',
  })
  @Post('/update/status/:id')
  async updateBatchShowStatus(
    @Param('id') id: string,
    @Query('status') status: number,
    @Request() req,
  ) {
    console.log('req', req);
    const result = await this.homeAdvertiseService.updateStatus(id, status);
    return result;
  }

  @ApiOperation({
    summary: '修改',
  })
  @Post('/update/:id')
  async update(
    @Param('id') id: string,
    @Body() updateDto: UpdateHomeAdvertiseDto,
  ) {
    const result = await this.homeAdvertiseService.update(id, updateDto);
    return result;
  }

  @ApiOperation({
    summary: '删除',
  })
  @Post('delete')
  async updateBatchDel(@Body('ids') ids: string) {
    console.log('参数值', ids);
    const result = await this.homeAdvertiseService.batchDelete(ids);
    return result;
  }
}
