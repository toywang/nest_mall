import { PartialType } from '@nestjs/mapped-types';
import { CreateHomeAdvertiseDto } from './create-home-advertise.dto';

export class UpdateHomeAdvertiseDto extends PartialType(
  CreateHomeAdvertiseDto,
) {}
