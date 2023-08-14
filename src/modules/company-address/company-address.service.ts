import { Injectable } from '@nestjs/common';
import { CreateCompanyAddressDto } from './dto/create-company-address.dto';
import { UpdateCompanyAddressDto } from './dto/update-company-address.dto';
import { CompanyAddress } from './entities/company-address.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class CompanyAddressService {
  constructor(
    @InjectRepository(CompanyAddress)
    private caRepository: Repository<CompanyAddress>,
  ) {}

  async findAll() {
    return await this.caRepository.find();
  }
}
