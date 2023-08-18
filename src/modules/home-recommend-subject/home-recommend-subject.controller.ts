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
import { HomeRecommendSubjectService } from './home-recommend-subject.service';
import { CreateHomeRecommendSubjectDto } from './dto/create-home-recommend-subject.dto';
import { UpdateHomeRecommendSubjectDto } from './dto/update-home-recommend-subject.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { SubjectSearchDto } from './dto/subject-search.dto';
import { CommonResult } from '@src/common/CommonResult';

@ApiTags('首页专题推荐管理')
@Controller('/home/recommendSubject')
export class HomeRecommendSubjectController {
  constructor(
    private readonly homeRecommendSubjectService: HomeRecommendSubjectService,
  ) {}

  @ApiOperation({
    summary: '添加首页推荐专题',
  })
  @Post('create')
  create(@Body() subjects: [any]) {
    return this.homeRecommendSubjectService.create(subjects);
  }

  @ApiOperation({
    summary: '首页专题推荐列表',
  })
  @Get('list')
  async findAll(@Query() query: SubjectSearchDto) {
    const list = await this.homeRecommendSubjectService.getPageList(query);
    const result = CommonResult.pageData(list, query.pageNum, query.pageSize);
    return result;
  }

  @ApiOperation({
    summary: '批量修改推荐状态',
  })
  @Post('/update/recommendStatus')
  async updateBatchShowStatus(
    @Body('ids') ids: string,
    @Body('recommendStatus') recommendStatus: number,
  ) {
    console.log('参数值', ids, recommendStatus);
    const result =
      await this.homeRecommendSubjectService.batchUpdateRecommendStatus(
        ids,
        recommendStatus,
      );
    return result;
  }

  @ApiOperation({
    summary: '批量删除推荐',
  })
  @Post('delete')
  async updateBatchDel(@Body('ids') ids: string) {
    console.log('参数值', ids);
    const result = await this.homeRecommendSubjectService.batchDelete(ids);
    return result;
  }

  @ApiOperation({
    summary: '修改推荐排序',
  })
  @Post('/update/sort/:id')
  async updateSort(@Param('id') id: string, @Body('sort') sort: number) {
    console.log('参数值', id, sort);
    const result = await this.homeRecommendSubjectService.updateSort(id, sort);
    return result;
  }
}
