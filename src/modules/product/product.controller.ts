import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  Request,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { BasePageDto } from '@src/common/BasePageDto';
import { CommonResult } from '@src/common/CommonResult';

@ApiTags('产品')
@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  // @ApiOperation({
  //   summary: '创建商品',
  // })
  // @Post('create')
  // async create() {}

  @ApiOperation({
    summary: '获取产品列表',
  })
  @Get('list')
  async getProductPageList(@Query() query: BasePageDto, @Request() req) {
    console.log(req.user, query);
    const pageList = await this.productService.getProductList(query);
    const result = CommonResult.pageData(
      pageList,
      query.pageSize,
      query.pageNum,
    );

    return result;
  }

  // @ApiOperation({
  //   summary: '根据商品名称或货号模糊查询',
  // })
  // @Get('simpleList')
  // async getList(@Query('') , @Request() req) {
  //   console.log(req.user, query);
  //   const pageList = await this.productService.getProductList(query);
  //   const result = CommonResult.pageData(
  //     pageList,
  //     query.pageSize,
  //     query.pageNum,
  //   );

  //   return result;
  // }

  @ApiOperation({
    summary: '根据商品id获取商品编辑信息',
  })
  @Get('/updateInfo/:id')
  async getProductDetail(@Param('id') id: string) {
    const result = await this.productService.getProductById(id);
    return result;
  }

  @ApiOperation({
    summary: '批量上下架商品',
  })
  @Post('/update/publishStatus')
  async updateBatchPublishStatus(
    @Query('ids') ids: string,
    @Query('publishStatus') publishStatus: number,
  ) {
    console.log('参数值', ids, publishStatus);
    const result = await this.productService.batchUpdatePublishStatus(
      ids,
      publishStatus,
    );
    return result;
  }

  @ApiOperation({
    summary: '批量推荐商品',
  })
  @Post('/update/recommendStatus')
  async updateBatchRecommendStatus(
    @Query('ids') ids: string,
    @Query('recommendStatus') recommendStatus: number,
  ) {
    console.log('参数值', ids, recommendStatus);
    const result = await this.productService.batchUpdateRecommendStatus(
      ids,
      recommendStatus,
    );
    return result;
  }

  @ApiOperation({
    summary: '批量设为新品',
  })
  @Post('/update/newStatus')
  async updateBatchNewStatus(
    @Query('ids') ids: string,
    @Query('newStatus') newStatus: number,
  ) {
    console.log('参数值', ids, newStatus);
    const result = await this.productService.batchUpdateNewStatus(
      ids,
      newStatus,
    );
    return result;
  }

  @ApiOperation({
    summary: '批量修改删除状态',
  })
  @Post('/update/deleteStatus')
  async updateBatchDeleteStatus(
    @Query('ids') ids: string,
    @Query('deleteStatus') deleteStatus: number,
  ) {
    console.log('参数值', ids, deleteStatus);
    const result = await this.productService.batchUpdateDeleteStatus(
      ids,
      deleteStatus,
    );
    return result;
  }
}
