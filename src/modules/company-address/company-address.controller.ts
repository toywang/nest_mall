import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CompanyAddressService } from './company-address.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('收货地址管理')
@Controller('companyAddress')
export class CompanyAddressController {
  constructor(private readonly companyAddressService: CompanyAddressService) {}

  @Get('list')
  findAll() {
    return this.companyAddressService.findAll();
  }
}
