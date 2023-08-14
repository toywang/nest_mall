import { PartialType } from '@nestjs/mapped-types';
import { CreateOrderSettingDto } from './create-order-setting.dto';

export class UpdateOrderSettingDto extends PartialType(CreateOrderSettingDto) {}
