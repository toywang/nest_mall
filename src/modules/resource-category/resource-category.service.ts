import { Injectable } from '@nestjs/common';
import { CreateResourceCategoryDto } from './dto/create-resource-category.dto';
import { UpdateResourceCategoryDto } from './dto/update-resource-category.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ResourceCategory } from './entities/resource-category.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ResourceCategoryService {
  constructor(
    @InjectRepository(ResourceCategory)
    private rcRepository: Repository<ResourceCategory>,
  ) {}
  create(createResourceCategoryDto: CreateResourceCategoryDto) {
    return 'This action adds a new resourceCategory';
  }

  async findAll() {
    const result = this.rcRepository.find();
    return result;
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
