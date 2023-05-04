import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Request,
  Query,
  HttpException,
  HttpStatus,
  Req,
  ParseIntPipe,
} from '@nestjs/common';
import { RoleService } from './role.service';
import { CommonResult } from '@src/common/CommonResult';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { BasePageDto } from '@src/common/BasePageDto';
import { AllocMenuDto } from './dto/allocMenuDto';
import { RoleInfoDto } from './dto/roleInfoDto';

@ApiTags('角色模块')
@Controller('role')
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @ApiOperation({
    summary: '获取所有角色列表',
  })
  @Get('listAll')
  async getAdminList(@Request() req) {
    console.log(req.user);
    const data = await this.roleService.getRoleList();
    return data;
  }

  @ApiOperation({
    summary: '获取分页角色列表',
  })
  @Get('list')
  async getRolePageList(@Query() query: BasePageDto, @Request() req) {
    console.log(req.user, query);
    const pageList = await this.roleService.getRolePageList(query);
    const result = CommonResult.pageData(
      pageList,
      query.pageSize,
      query.pageNum,
    );

    return result;
  }

  @ApiOperation({
    summary: '获取角色对应的菜单',
  })
  @Get('/listMenu/:id') // 艹，，这个获取参数查半天
  async getRoleListById(@Param('id') id: string) {
    const menuList = await this.roleService.getMenuListByRoleId(id);
    return menuList;
  }

  @ApiOperation({
    summary: '分配菜单给角色',
  })
  @Post('allocMenu')
  async allocMenuByRole(@Body() allocMenuDto: AllocMenuDto) {
    const { roleId, menuIds } = allocMenuDto;
    const menus = menuIds.split(',').map(Number);
    if (!menus.length) {
      throw new HttpException('菜单ID不能为空', HttpStatus.OK);
    }
    const result = await this.roleService.doAllocMenuByRole(roleId, menus);
    return result;
  }

  @ApiOperation({
    summary: '修改角色信息',
  })
  @Post('/update/:id')
  async updateRoleById(@Param('id') id: number, @Body() roleInfo: RoleInfoDto) {
    const result = await this.roleService.updateRoleInfo(id, roleInfo);
    return result;
  }

  @ApiOperation({
    summary: '修改启动状态 1启动 0禁用',
  })
  @Post('/updateStatus/:id')
  async updateRoleStatusById(
    @Param('id') id: number,
    @Query('status', new ParseIntPipe()) status: number,
  ) {
    // param 获取动态路由的参数  query 获取表单的数据
    const result = await this.roleService.updateRoleStatus(id, status);
    return result;
  }

  @ApiOperation({
    summary: '新建角色',
  })
  @Post('create')
  async createRole(@Body() roleInfo: RoleInfoDto) {
    const exist = await this.roleService.queryRoleByName(roleInfo.name);
    if (exist) {
      throw new HttpException('角色名称已经存在', HttpStatus.BAD_REQUEST);
    }

    const result = await this.roleService.createRole(roleInfo);
    return result;
  }

  @ApiOperation({
    summary: '删除角色',
  })
  @Post('delete')
  async deleteRole(@Body('ids') ids: number) {
    const result = await this.roleService.deleteRole(ids);
    return result;
  }
}
