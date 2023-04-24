import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import { PermissionService } from './permission.service';
import { ApiBody } from '@nestjs/swagger';

@Controller('permission')
export class PermissionController {
  constructor(private readonly permissionService: PermissionService) {}
}
