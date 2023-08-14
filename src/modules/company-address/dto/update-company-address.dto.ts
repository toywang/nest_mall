import { PartialType } from '@nestjs/mapped-types';
import { CreateCompanyAddressDto } from './create-company-address.dto';

export class UpdateCompanyAddressDto extends PartialType(CreateCompanyAddressDto) {}
