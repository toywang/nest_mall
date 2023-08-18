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
import { HomeBrandService } from './home-brand.service';
import { CreateHomeBrandDto } from './dto/create-home-brand.dto';
import { UpdateHomeBrandDto } from './dto/update-home-brand.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { HomeSearchBrandDto } from './dto/home-search-brand.dto';
import { CommonResult } from '@src/common/CommonResult';

@ApiTags('首页品牌管理')
@Controller('/home/brand')
export class HomeBrandController {
  constructor(private readonly homeBrandService: HomeBrandService) {}

  @ApiOperation({
    summary: '添加首页品牌',
  })
  @Post('create')
  create(@Body() homeBrandList: [any]) {
    return this.homeBrandService.create(homeBrandList);
  }

  @ApiOperation({
    summary: '首页推荐列表',
  })
  @Get('list')
  async findAll(@Query() query: HomeSearchBrandDto) {
    const list = await this.homeBrandService.getPageList(query);
    const result = CommonResult.pageData(list, query.pageNum, query.pageSize);
    return result;
  }

  @ApiOperation({
    summary: '批量修改推荐状态',
  })
  @Post('/update/recommendStatus')
  async updateBatchShowStatus(
    @Body('ids') ids: string,
    @Body('recommendStatus') recommendStatus: number,
  ) {
    console.log('参数值', ids, recommendStatus);
    const result = await this.homeBrandService.batchUpdateRecommendStatus(
      ids,
      recommendStatus,
    );
    return result;
  }

  @ApiOperation({
    summary: '批量删除推荐',
  })
  @Post('delete')
  async updateBatchDel(@Body('ids') ids: string) {
    console.log('参数值', ids);
    const result = await this.homeBrandService.batchDelete(ids);
    return result;
  }

  @ApiOperation({
    summary: '修改推荐排序',
  })
  @Post('/update/sort/:id')
  async updateSort(@Param('id') id: string, @Body('sort') sort: number) {
    console.log('参数值', id, sort);
    const result = await this.homeBrandService.updateSort(id, sort);
    return result;
  }
}
