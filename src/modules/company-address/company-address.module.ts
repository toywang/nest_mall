import { Module } from '@nestjs/common';
import { CompanyAddressService } from './company-address.service';
import { CompanyAddressController } from './company-address.controller';
import { CompanyAddress } from './entities/company-address.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([CompanyAddress])],
  controllers: [CompanyAddressController],
  providers: [CompanyAddressService],
})
export class CompanyAddressModule {}
