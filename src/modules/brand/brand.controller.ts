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
  HttpException,
  HttpStatus,
  ParseIntPipe,
} from '@nestjs/common';
import { BrandService } from './brand.service';
import { CreateBrandDto } from './dto/create-brand.dto';
import { UpdateBrandDto } from './dto/update-brand.dto';
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { BasePageDto } from '@src/common/BasePageDto';
import { CommonResult } from '@src/common/CommonResult';

@ApiTags('品牌')
@Controller('brand')
export class BrandController {
  constructor(private readonly brandService: BrandService) {}

  @ApiOperation({
    summary: '新建品牌',
  })
  @Post('create')
  async create(@Body() brand: CreateBrandDto) {
    const exist = await this.brandService.queryBrandByName(brand.name);
    if (exist) {
      throw new HttpException('品牌名称已经存在', HttpStatus.BAD_REQUEST);
    }

    const result = await this.brandService.createBrand(brand);
    return result;
  }

  @ApiOperation({
    summary: '获取品牌列表',
  })
  @Get('list') //这个必须放在详情前面
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

  @ApiOperation({
    summary: '批量显示品牌',
  })
  @Post('/update/showStatus')
  async updateBatchShowStatus(
    @Body('ids') ids: string,
    @Body('showStatus') showStatus: number,
  ) {
    console.log('参数值', ids, showStatus);
    const result = await this.brandService.batchUpdateBransShowStatus(
      ids,
      showStatus,
    );
    return result;
  }

  @ApiOperation({
    summary: '批量品牌制造商',
  })
  @Post('/update/factoryStatus')
  async updateBatchFactoryStatus(
    @Body('ids') ids: string,
    @Body('factoryStatus') showStatus: number,
  ) {
    console.log('参数值', ids, showStatus);
    const result = await this.brandService.batchUpdateBransFactoryStatus(
      ids,
      showStatus,
    );
    return result;
  }

  @ApiOperation({
    summary: '修改信息',
  })
  @Post('/update/:id')
  async updateBrandById(
    @Param('id') id: number,
    @Body() brandInfo: UpdateBrandDto,
  ) {
    const result = await this.brandService.updateBrandInfo(id, brandInfo);
    return result;
  }

  @ApiOperation({
    summary: '删除',
  })
  @Get('/delete/:id')
  async deleteBrandById(@Param('id') id: number) {
    console.log('获取的参数', id);
    const result = await this.brandService.deleteBrand(id);
    return result;
  }

  @ApiOperation({
    summary: '获取品牌详情',
  })
  @Get(':id')
  async getBrandById(@Param('id') id: number) {
    const result = await this.brandService.getBrandDetail(id);
    return result;
  }
}
