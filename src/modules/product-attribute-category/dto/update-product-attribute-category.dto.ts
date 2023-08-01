import { PartialType } from '@nestjs/mapped-types';
import { CreateProductAttributeCategoryDto } from './create-product-attribute-category.dto';

export class UpdateProductAttributeCategoryDto extends PartialType(CreateProductAttributeCategoryDto) {}
