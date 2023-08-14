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
import { ReturnApplyService } from './return-apply.service';
import { CreateReturnApplyDto } from './dto/create-return-apply.dto';
import { UpdateReturnApplyDto } from './dto/update-return-apply.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { BasePageDto } from '@src/common/BasePageDto';
import { CommonResult } from '@src/common/CommonResult';
import { SearchDto } from './dto/search.dto';

@ApiTags('订单退货申请管理')
@Controller('returnApply')
export class ReturnApplyController {
  constructor(private readonly returnApplyService: ReturnApplyService) {}

  @ApiOperation({ summary: '查询列表' })
  @Get('list')
  async findAll(@Query() query: SearchDto) {
    const pageList = await this.returnApplyService.getPageList(query);
    const result = CommonResult.pageData(
      pageList,
      query.pageSize,
      query.pageNum,
    );

    return result;
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.returnApplyService.findOne(id);
  }

  @Post('/update/status/:id')
  update(@Param('id') id: string, @Body() updateReturnApplyDto: any) {
    return this.returnApplyService.update(id, updateReturnApplyDto);
  }

  @ApiOperation({ summary: '删除' })
  @Post('delete')
  delete(@Query('ids') ids: string) {
    return this.returnApplyService.batchDelete(ids);
  }
}
