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
import { HomeRecommendProductService } from './home-recommend-product.service';
import { CreateHomeRecommendProductDto } from './dto/create-home-recommend-product.dto';
import { UpdateHomeRecommendProductDto } from './dto/update-home-recommend-product.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CommonResult } from '@src/common/CommonResult';
import { ProductSearchDto } from './dto/product-search.dto';

@ApiTags('首页人气推荐管理')
@Controller('/home/recommendProduct')
export class HomeRecommendProductController {
  constructor(
    private readonly homeRecommendProductService: HomeRecommendProductService,
  ) {}

  @ApiOperation({
    summary: '添加首页专题',
  })
  @Post('create')
  create(@Body() products: [any]) {
    return this.homeRecommendProductService.create(products);
  }

  @ApiOperation({
    summary: '首页推荐列表',
  })
  @Get('list')
  async findAll(@Query() query: ProductSearchDto) {
    const list = await this.homeRecommendProductService.getPageList(query);
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
    const result =
      await this.homeRecommendProductService.batchUpdateRecommendStatus(
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
    const result = await this.homeRecommendProductService.batchDelete(ids);
    return result;
  }

  @ApiOperation({
    summary: '修改推荐排序',
  })
  @Post('/update/sort/:id')
  async updateSort(@Param('id') id: string, @Body('sort') sort: number) {
    console.log('参数值', id, sort);
    const result = await this.homeRecommendProductService.updateSort(id, sort);
    return result;
  }
}
