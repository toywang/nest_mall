import { PartialType } from '@nestjs/mapped-types';
import { CreateMemberLevelDto } from './create-member-level.dto';

export class UpdateMemberLevelDto extends PartialType(CreateMemberLevelDto) {}
