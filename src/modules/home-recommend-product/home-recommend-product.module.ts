import { Module } from '@nestjs/common';
import { HomeRecommendProductService } from './home-recommend-product.service';
import { HomeRecommendProductController } from './home-recommend-product.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HomeRecommendProduct } from './entities/home-recommend-product.entity';

@Module({
  imports: [TypeOrmModule.forFeature([HomeRecommendProduct])],
  controllers: [HomeRecommendProductController],
  providers: [HomeRecommendProductService],
})
export class HomeRecommendProductModule {}
