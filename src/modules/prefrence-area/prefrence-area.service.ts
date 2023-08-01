import { Injectable } from '@nestjs/common';
import { CreatePrefrenceAreaDto } from './dto/create-prefrence-area.dto';
import { UpdatePrefrenceAreaDto } from './dto/update-prefrence-area.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { PrefrenceArea } from './entities/prefrence-area.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PrefrenceAreaService {
  constructor(
    @InjectRepository(PrefrenceArea)
    private paRepository: Repository<PrefrenceArea>,
  ) {}

  async findAll() {
    const res = await this.paRepository.find();
    return res;
  }
}
