import { Module } from '@nestjs/common';
import { ResourceCategoryService } from './resource-category.service';
import { ResourceCategoryController } from './resource-category.controller';

@Module({
  controllers: [ResourceCategoryController],
  providers: [ResourceCategoryService]
})
export class ResourceCategoryModule {}
