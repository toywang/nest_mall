import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  ParseIntPipe,
} from '@nestjs/common';
import { MenuService } from './menu.service';

import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { BasePageDto } from '@src/common/BasePageDto';
import { CommonResult } from '@src/common/CommonResult';
import { MenuInfoDto } from './dto/menuInfo.dto';

@ApiTags('权限菜单')
@Controller('menu')
export class MenuController {
  constructor(private readonly menuService: MenuService) {}

  @ApiOperation({
    description: '添加菜单',
  })
  @Post('create')
  async create(@Body() infoDto: MenuInfoDto) {
    const result = await this.menuService.createMenu(infoDto);
    return result;
  }

  @ApiOperation({
    summary: '菜单treelist',
  })
  @Get('treeList')
  findAll() {
    return this.menuService.getMenuAllList();
  }

  @ApiOperation({
    description: '查询每一级的菜单列表',
  })
  @Get('/list/:parentId')
  async findNodeList(
    @Param('parentId') parentId: number,
    @Query() pageDto: BasePageDto,
  ) {
    const pageList = await this.menuService.getParentList(parentId, pageDto);
    const result = CommonResult.pageData(
      pageList,
      pageDto.pageSize,
      pageDto.pageNum,
    );
    return result;
  }

  @ApiOperation({
    description: '菜单详情',
  })
  @Get(':id')
  async findMenuDetail(@Param('id') id: number) {
    const result = await this.menuService.queryMenuById(id);
    return result;
  }

  @ApiOperation({
    description: '更新菜单',
  })
  @Post('/update/:id')
  async updateMenuInfo(@Param('id') id: number, @Body() infoDto: MenuInfoDto) {
    const result = await this.menuService.updateMenuInfo(id, infoDto);
    return result;
  }

  @ApiOperation({
    description: '删除菜单',
  })
  @Post('/delete/:id')
  async delete(@Param('id') id: number) {
    const result = await this.menuService.deleteMenu(id);
    return result;
  }
}
