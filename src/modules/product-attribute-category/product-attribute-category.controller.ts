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
import { ProductAttributeCategoryService } from './product-attribute-category.service';
import { CreateProductAttributeCategoryDto } from './dto/create-product-attribute-category.dto';
import { UpdateProductAttributeCategoryDto } from './dto/update-product-attribute-category.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { BasePageDto } from '@src/common/BasePageDto';
import { CommonResult } from '@src/common/CommonResult';

@ApiTags('商品属性分类管理')
@Controller('productAttribute/category/')
export class ProductAttributeCategoryController {
  constructor(
    private readonly productAttributeCategoryService: ProductAttributeCategoryService,
  ) {}

  @Post()
  create(
    @Body()
    createProductAttributeCategoryDto: CreateProductAttributeCategoryDto,
  ) {
    return this.productAttributeCategoryService.create(
      createProductAttributeCategoryDto,
    );
  }
  @ApiOperation({
    summary: '分页获取所有商品属性分类',
  })
  @Get('list')
  async findAll(@Query() query: BasePageDto, @Request() req) {
    const childList = await this.productAttributeCategoryService.getPageList(
      query,
    );
    const result = CommonResult.pageData(
      childList,
      query.pageSize,
      query.pageNum,
    );
    return result;
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productAttributeCategoryService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body()
    updateProductAttributeCategoryDto: UpdateProductAttributeCategoryDto,
  ) {
    return this.productAttributeCategoryService.update(
      +id,
      updateProductAttributeCategoryDto,
    );
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productAttributeCategoryService.remove(+id);
  }
}
