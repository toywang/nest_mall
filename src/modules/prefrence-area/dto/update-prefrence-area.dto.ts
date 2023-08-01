import { PartialType } from '@nestjs/mapped-types';
import { CreatePrefrenceAreaDto } from './create-prefrence-area.dto';

export class UpdatePrefrenceAreaDto extends PartialType(CreatePrefrenceAreaDto) {}
