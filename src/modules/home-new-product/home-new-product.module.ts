import { Module } from '@nestjs/common';
import { HomeNewProductService } from './home-new-product.service';
import { HomeNewProductController } from './home-new-product.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HomeNewProduct } from './entities/home-new-product.entity';

@Module({
  imports: [TypeOrmModule.forFeature([HomeNewProduct])],

  controllers: [HomeNewProductController],
  providers: [HomeNewProductService],
})
export class HomeNewProductModule {}
