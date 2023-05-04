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
import { ResourceService } from './resource.service';

import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { ResourcePageDto } from './dto/resourcePage.dto';
import { CommonResult } from '@src/common/CommonResult';

@ApiTags('后台资源模块')
@Controller('resource')
export class ResourceController {
  constructor(private readonly resourceService: ResourceService) {}

  @ApiOperation({
    summary: '获取全部资源列表',
  })
  @Get('listAll')
  findAll() {
    return this.resourceService.findAll();
  }

  @ApiOperation({
    summary: '获取全部资源分页列表',
  })
  @Get('list')
  async findListPage(@Query() pageDto: ResourcePageDto) {
    const pageList = await this.resourceService.getResourcePageList(pageDto);
    const result = CommonResult.pageData(
      pageList,
      pageDto.pageSize,
      pageDto.pageNum,
    );

    return result;
  }

  @ApiOperation({
    summary: '删除资源',
  })
  @Get('/delete/:id')
  async delete(@Param('id') id: number) {
    const result = await this.resourceService.deleteResource(id);
    return result;
  }
}
