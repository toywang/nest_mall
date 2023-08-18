import { PartialType } from '@nestjs/mapped-types';
import { CreateHomeBrandDto } from './create-home-brand.dto';

export class UpdateHomeBrandDto extends PartialType(CreateHomeBrandDto) {}
