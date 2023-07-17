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
import { BrandService } from './brand.service';
import { CreateBrandDto } from './dto/create-brand.dto';
import { UpdateBrandDto } from './dto/update-brand.dto';
import { ApiOperation } from '@nestjs/swagger';
import { BasePageDto } from '@src/common/BasePageDto';
import { CommonResult } from '@src/common/CommonResult';

@Controller('brand')
export class BrandController {
  constructor(private readonly brandService: BrandService) {}

  @ApiOperation({
    summary: '获取品牌列表',
  })
  @Get('list')
  async getBrandPageList(@Query() query: BasePageDto, @Request() req) {
    console.log(req.user, query);
    const pageList = await this.brandService.getBrandList(query);
    const result = CommonResult.pageData(
      pageList,
      query.pageSize,
      query.pageNum,
    );

    return result;
  }
}
