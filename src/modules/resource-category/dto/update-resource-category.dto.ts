import { PartialType } from '@nestjs/swagger';
import { CreateResourceCategoryDto } from './create-resource-category.dto';

export class UpdateResourceCategoryDto extends PartialType(CreateResourceCategoryDto) {}
