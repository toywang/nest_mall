import { Module } from '@nestjs/common';
import { ResourceCategoryService } from './resource-category.service';
import { ResourceCategoryController } from './resource-category.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ResourceCategory } from './entities/resource-category.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ResourceCategory])],
  controllers: [ResourceCategoryController],
  providers: [ResourceCategoryService],
})
export class ResourceCategoryModule {}
