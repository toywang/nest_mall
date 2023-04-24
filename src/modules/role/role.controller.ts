import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Request,
} from '@nestjs/common';
import { RoleService } from './role.service';
import { CommonResult } from '@src/common/CommonResult';

@Controller('role')
export class RoleController {
  constructor(private readonly roleService: RoleService) {}
  @Get('listAll')
  async getAdminList(@Request() req) {
    console.log(req.user);
    const data = await this.roleService.getRoleList();
    return CommonResult.successCommon(data);
  }
}
