import { PartialType } from '@nestjs/mapped-types';
import { CreateHomeNewProductDto } from './create-home-new-product.dto';

export class UpdateHomeNewProductDto extends PartialType(CreateHomeNewProductDto) {}
