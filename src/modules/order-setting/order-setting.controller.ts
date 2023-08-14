import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { OrderSettingService } from './order-setting.service';
import { CreateOrderSettingDto } from './dto/create-order-setting.dto';
import { UpdateOrderSettingDto } from './dto/update-order-setting.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('订单设置管理')
@Controller('orderSetting')
export class OrderSettingController {
  constructor(private readonly orderSettingService: OrderSettingService) {}

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.orderSettingService.findOne(+id);
  }

  @ApiOperation({ summary: '更新' })
  @Post('/update/:id')
  update(
    @Param('id') id: number,
    @Body() updateOrderSettingDto: UpdateOrderSettingDto,
  ) {
    return this.orderSettingService.update(+id, updateOrderSettingDto);
  }
}
