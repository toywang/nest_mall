import { PartialType } from '@nestjs/mapped-types';
import { CreateReturnApplyDto } from './create-return-apply.dto';

export class UpdateReturnApplyDto extends PartialType(CreateReturnApplyDto) {}
