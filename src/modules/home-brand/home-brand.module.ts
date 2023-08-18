import { Module } from '@nestjs/common';
import { HomeBrandService } from './home-brand.service';
import { HomeBrandController } from './home-brand.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HomeBrand } from './entities/home-brand.entity';

@Module({
  imports: [TypeOrmModule.forFeature([HomeBrand])],

  controllers: [HomeBrandController],
  providers: [HomeBrandService],
})
export class HomeBrandModule {}
