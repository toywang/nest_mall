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
import { HomeNewProductService } from './home-new-product.service';
import { CreateHomeNewProductDto } from './dto/create-home-new-product.dto';
import { UpdateHomeNewProductDto } from './dto/update-home-new-product.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { HomeNewProductSearchDto } from './dto/home-new-product-search.dto';
import { CommonResult } from '@src/common/CommonResult';

@ApiTags('首页新品管理')
@Controller('/home/newProduct')
export class HomeNewProductController {
  constructor(private readonly homeNewProductService: HomeNewProductService) {}
  @ApiOperation({
    summary: '添加首页新品',
  })
  @Post('create')
  create(@Body() homeNewProductList: [any]) {
    return this.homeNewProductService.create(homeNewProductList);
  }

  @ApiOperation({
    summary: '首页推荐列表',
  })
  @Get('list')
  async findAll(@Query() query: HomeNewProductSearchDto) {
    const list = await this.homeNewProductService.getPageList(query);
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
    const result = await this.homeNewProductService.batchUpdateRecommendStatus(
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
    const result = await this.homeNewProductService.batchDelete(ids);
    return result;
  }

  @ApiOperation({
    summary: '修改推荐排序',
  })
  @Post('/update/sort/:id')
  async updateSort(@Param('id') id: string, @Body('sort') sort: number) {
    console.log('参数值', id, sort);
    const result = await this.homeNewProductService.updateSort(id, sort);
    return result;
  }
}
