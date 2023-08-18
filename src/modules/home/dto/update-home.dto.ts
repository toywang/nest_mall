import { PartialType } from '@nestjs/mapped-types';
import { CreateHomeDto } from './create-home.dto';

export class UpdateHomeDto extends PartialType(CreateHomeDto) {}
