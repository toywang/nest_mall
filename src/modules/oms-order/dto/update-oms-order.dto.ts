import { PartialType } from '@nestjs/mapped-types';
import { CreateOmsOrderDto } from './create-oms-order.dto';

export class UpdateOmsOrderDto extends PartialType(CreateOmsOrderDto) {}
