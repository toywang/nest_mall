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
import { ReturnReasonService } from './return-reason.service';
import { CreateReturnReasonDto } from './dto/create-return-reason.dto';
import { UpdateReturnReasonDto } from './dto/update-return-reason.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { BasePageDto } from '@src/common/BasePageDto';
import { CommonResult } from '@src/common/CommonResult';

@ApiTags('退货原因')
@Controller('returnReason')
export class ReturnReasonController {
  constructor(private readonly returnReasonService: ReturnReasonService) {}

  @ApiOperation({ summary: '新建原因' })
  @Post('create')
  create(@Body() createReturnReasonDto: CreateReturnReasonDto) {
    return this.returnReasonService.create(createReturnReasonDto);
  }

  @ApiOperation({ summary: '查询列表' })
  @Get('list')
  async findAll(@Query() query: BasePageDto) {
    const pageList = await this.returnReasonService.getPageList(query);
    const result = CommonResult.pageData(
      pageList,
      query.pageSize,
      query.pageNum,
    );

    return result;
  }

  @ApiOperation({ summary: '查询详情' })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.returnReasonService.findOne(+id);
  }

  @ApiOperation({ summary: '更改' })
  @Post('/update/:id')
  update(
    @Param('id') id: string,
    @Body() updateReturnReasonDto: UpdateReturnReasonDto,
  ) {
    return this.returnReasonService.update(+id, updateReturnReasonDto);
  }

  @ApiOperation({ summary: '删除' })
  @Post('delete')
  delete(@Query('ids') ids: string) {
    return this.returnReasonService.batchDelete(ids);
  }
}
