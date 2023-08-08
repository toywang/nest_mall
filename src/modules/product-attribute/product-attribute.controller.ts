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
import { ProductAttributeService } from './product-attribute.service';
import { CreateProductAttributeDto } from './dto/create-product-attribute.dto';
import { UpdateProductAttributeDto } from './dto/update-product-attribute.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CommonResult } from '@src/common/CommonResult';

@ApiTags('商品属性管理')
@Controller('productAttribute')
export class ProductAttributeController {
  constructor(
    private readonly productAttributeService: ProductAttributeService,
  ) {}

  @ApiOperation({
    summary: '根据分类查询属性列表或参数列表',
  })
  @Get('/list/:id')
  async findAll(@Param('id') id: number, @Query() pageInfo: any) {
    console.log('按时', pageInfo);
    const childList = await this.productAttributeService.findAll(id, pageInfo);

    const result = CommonResult.pageData(
      childList,
      pageInfo.pageSize,
      pageInfo.pageNum,
    );
    return result;
  }
}
