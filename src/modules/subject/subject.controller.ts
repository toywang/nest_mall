import { Controller, Get, Query, Request } from '@nestjs/common';
import { SubjectService } from './subject.service';

import { BasePageDto } from '@src/common/BasePageDto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('商品专题管理')
@Controller('subject')
export class SubjectController {
  constructor(private readonly subjectService: SubjectService) {}

  @ApiOperation({
    summary: '获取全部商品专题',
  })
  @Get('listAll')
  findAll() {
    return this.subjectService.findAll();
  }

  @ApiOperation({
    summary: '根据专题名称分页获取商品专题',
  })
  @Get('list')
  findOne(@Query() query: BasePageDto, @Request() req) {
    return this.subjectService.getPageList(query);
  }
}
