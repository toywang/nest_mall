import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ResourceCategoryService } from './resource-category.service';
import { CreateResourceCategoryDto } from './dto/create-resource-category.dto';
import { UpdateResourceCategoryDto } from './dto/update-resource-category.dto';

@Controller('resource-category')
export class ResourceCategoryController {
  constructor(private readonly resourceCategoryService: ResourceCategoryService) {}

  @Post()
  create(@Body() createResourceCategoryDto: CreateResourceCategoryDto) {
    return this.resourceCategoryService.create(createResourceCategoryDto);
  }

  @Get()
  findAll() {
    return this.resourceCategoryService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.resourceCategoryService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateResourceCategoryDto: UpdateResourceCategoryDto) {
    return this.resourceCategoryService.update(+id, updateResourceCategoryDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.resourceCategoryService.remove(+id);
  }
}
