import {
  Controller,
  Post,
  UseGuards,
  Body,
  UseInterceptors,
  ClassSerializerInterceptor,
  Get,
  Query,
  Request,
  Param,
} from '@nestjs/common';
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/LoginDto';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { SkipJwtAuth } from './constants';
import { RegisterDto } from './dto/RegisterDto';
import { PermissionService } from '@modules/permission/permission.service';
import { CommonResult } from '@src/common/CommonResult';
import { RoleService } from '@modules/role/role.service';
import { BasePageDto } from '@src/common/BasePageDto';
import { UpdateRoleDto } from './dto/UpdateRoleDto';
import { EntityManager, Transaction, TransactionManager } from 'typeorm';
import { UserService } from '../user/user.service';
import { ConfigService } from '@nestjs/config';

@ApiTags('登录注册及用户相关模块')
@Controller('admin')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly permissionService: PermissionService,
    private readonly roleService: RoleService,
    private readonly userService: UserService,
    private readonly configService: ConfigService,
  ) {}
  @ApiOperation({
    summary: '后台登录',
  })
  @ApiBody({ type: LoginDto, description: '后台登录' })
  @SkipJwtAuth()
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req) {
    console.log('configService', this.configService.get('jwt.secret'));
    return this.authService.login(req.user);
  }

  @ApiOperation({
    summary: '后台退出登录',
  })
  @Post('logout')
  @SkipJwtAuth()
  async logout(@Request() req) {
    return CommonResult.successCommon(null);
  }

  @ApiOperation({
    summary: '后台注册',
  })
  @ApiBody({ type: RegisterDto, description: '后台注册' })
  @SkipJwtAuth()
  @UseInterceptors(ClassSerializerInterceptor)
  @Post('register')
  async register(@Request() req, @Body() registerDto: RegisterDto) {
    return this.authService.register(registerDto);
  }

  @ApiOperation({
    summary: '获取当前登录用户的菜单以及对应的角色list',
    description: '获取当前登录用户的菜单',
  })
  @Get('info')
  async getAdminInfo(@Request() req) {
    console.log('req.user', req.user);
    const user = req.user;
    const menuList = await this.permissionService.getMenuList(user.id);
    const roleList = await this.roleService.getRoleListById(user.id);
    const result = {
      username: user.username,
      menus: menuList,
      roles: roleList,
    };

    return result;
  }

  @ApiOperation({
    summary: '获取用户列表',
  })
  @Get('list')
  async getAdminList(@Query() query: BasePageDto, @Request() req) {
    console.log(req.user, query);
    const pageList = await this.roleService.getAdminList(query);
    const result = CommonResult.pageData(
      pageList,
      query.pageSize,
      query.pageNum,
    );

    return result;
  }

  @ApiOperation({
    summary: '获取用户对应的角色列表',
  })
  @Get('/role/:id') // 艹，，这个获取参数查半天
  async getRoleListById(@Param('id') id: string) {
    const roleList = await this.roleService.getRoleListById(id);
    return roleList;
  }

  @ApiOperation({
    summary: '分配用户角色',
  })
  @ApiBody({ type: UpdateRoleDto, description: '分配用户角色' })
  @Post('/role/update')
  @Transaction()
  async updateRole(
    @Body() updateRoleDto: UpdateRoleDto,
    @TransactionManager() manager: EntityManager,
  ) {
    const res = this.roleService.updateRole(updateRoleDto, manager);
    const result = {
      data: res,
    };
    return result;
  }

  @ApiOperation({
    summary: '删除用户',
  })
  @Post('/delete/:id') // 艹，，这个获取参数查半天
  async deleteUserById(@Param('id') id: string) {
    await this.userService.remove(Number(id));
    return '操作成功';
  }

  @ApiOperation({
    summary: '修改用户',
  })
  @Post('/update/:id') // 艹，，这个获取参数查半天
  async updateUserById(@Param('id') id: string, @Body() user: RegisterDto) {
    await this.userService.update(Number(id), user);
    return '操作成功';
  }
}
