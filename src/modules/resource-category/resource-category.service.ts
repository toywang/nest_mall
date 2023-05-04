import { Injectable } from '@nestjs/common';
import { CreateResourceCategoryDto } from './dto/create-resource-category.dto';
import { UpdateResourceCategoryDto } from './dto/update-resource-category.dto';

@Injectable()
export class ResourceCategoryService {
  create(createResourceCategoryDto: CreateResourceCategoryDto) {
    return 'This action adds a new resourceCategory';
  }

  findAll() {
    return `This action returns all resourceCategory`;
  }

  findOne(id: number) {
    return `This action returns a #${id} resourceCategory`;
  }

  update(id: number, updateResourceCategoryDto: UpdateResourceCategoryDto) {
    return `This action updates a #${id} resourceCategory`;
  }

  remove(id: number) {
    return `This action removes a #${id} resourceCategory`;
  }
}
