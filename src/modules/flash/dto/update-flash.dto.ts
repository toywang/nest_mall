import { PartialType } from '@nestjs/mapped-types';
import { CreateFlashDto } from './create-flash.dto';

export class UpdateFlashDto extends PartialType(CreateFlashDto) {}
