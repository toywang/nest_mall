import { BasePageDto } from '@src/common/BasePageDto';
import { IsNotEmpty, IsOptional } from 'class-validator';
export class SubjectSearchDto extends BasePageDto {
  @IsOptional()
  subjectName: string;

  @IsOptional()
  recommendStatus: number;
}
