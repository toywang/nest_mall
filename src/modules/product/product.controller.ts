import { Controller, Get, Query, Request } from '@nestjs/common';
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
}
