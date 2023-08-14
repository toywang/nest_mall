import { PartialType } from '@nestjs/mapped-types';
import { CreateReturnReasonDto } from './create-return-reason.dto';

export class UpdateReturnReasonDto extends PartialType(CreateReturnReasonDto) {}
