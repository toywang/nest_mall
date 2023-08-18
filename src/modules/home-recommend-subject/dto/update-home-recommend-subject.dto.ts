import { PartialType } from '@nestjs/mapped-types';
import { CreateHomeRecommendSubjectDto } from './create-home-recommend-subject.dto';

export class UpdateHomeRecommendSubjectDto extends PartialType(CreateHomeRecommendSubjectDto) {}
