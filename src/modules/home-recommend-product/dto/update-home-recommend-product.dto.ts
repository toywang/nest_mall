import { PartialType } from '@nestjs/mapped-types';
import { CreateHomeRecommendProductDto } from './create-home-recommend-product.dto';

export class UpdateHomeRecommendProductDto extends PartialType(CreateHomeRecommendProductDto) {}
