import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  Request,
} from '@nestjs/common';
import { ProductCategoryService } from './product-category.service';
import { CreateProductCategoryDto } from './dto/create-product-category.dto';
import { UpdateProductCategoryDto } from './dto/update-product-category.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { BasePageDto } from '@src/common/BasePageDto';
import { CommonResult } from '@src/common/CommonResult';

@ApiTags('产品分类')
@Controller('productCategory')
export class ProductCategoryController {
  constructor(
    private readonly productCategoryService: ProductCategoryService,
  ) {}

  //这个必须放在前面，否则会先适配下面路由
  @ApiOperation({
    summary: '获取产品分类列表分级',
  })
  @Get('/list/withChildren')
  async getProductCategoryChildList(@Request() req) {
    const childList =
      await this.productCategoryService.getProductCategoryChildList();

    return childList;
  }

  @ApiOperation({
    summary: '获取产品分类列表',
  })
  @Get('/list/:id')
  async getProductCategoryList(
    @Param('id') id: number,
    @Query() page: BasePageDto,
  ) {
    const childList = await this.productCategoryService.getCateList(page, id);
    const result = CommonResult.pageData(
      childList,
      page.pageSize,
      page.pageNum,
    );
    return result;
  }

  @ApiOperation({
    summary: '获取产品分类列表',
  })
  @Post('create')
  async createProductCategory(
    @Param('id') id: number,
    @Query() page: BasePageDto,
  ) {
    const childList = await this.productCategoryService.getCateList(page, id);
    const result = CommonResult.pageData(
      childList,
      page.pageSize,
      page.pageNum,
    );
    return result;
  }
}
