import { Module } from '@nestjs/common';
import { ProductAttributeCategoryService } from './product-attribute-category.service';
import { ProductAttributeCategoryController } from './product-attribute-category.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductAttributeCategory } from './entities/product-attribute-category.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ProductAttributeCategory])],
  controllers: [ProductAttributeCategoryController],
  providers: [ProductAttributeCategoryService],
})
export class ProductAttributeCategoryModule {}
