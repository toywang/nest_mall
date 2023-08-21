import { Module } from '@nestjs/common';
import { HomeService } from './home.service';
import { HomeController } from './home.controller';
import { SubjectService } from '../subject/subject.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Subject } from '../subject/entities/subject.entity';
import { HomeAdvertise } from '../home-advertise/entities/home-advertise.entity';
import { HomeAdvertiseService } from '../home-advertise/home-advertise.service';
import { HomeBrandService } from '../home-brand/home-brand.service';
import { FlashService } from '../flash/flash.service';
import { HomeNewProductService } from '../home-new-product/home-new-product.service';
import { HomeRecommendProductService } from '../home-recommend-product/home-recommend-product.service';
import { HomeRecommendSubjectService } from '../home-recommend-subject/home-recommend-subject.service';
import { HomeBrand } from '../home-brand/entities/home-brand.entity';
import { HomeNewProduct } from '../home-new-product/entities/home-new-product.entity';
import { HomeRecommendProduct } from '../home-recommend-product/entities/home-recommend-product.entity';
import { HomeRecommendSubject } from '../home-recommend-subject/entities/home-recommend-subject.entity';
import { Flash } from '../flash/entities/flash.entity';
import { PmsBrand } from './entities/pms-brand.entity';
import { Product } from '../product/entities/product.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Subject,
      HomeAdvertise,
      HomeBrand,
      HomeNewProduct,
      HomeRecommendProduct,
      HomeRecommendSubject,
      Flash,
      PmsBrand,
      Product,
    ]),
  ],

  controllers: [HomeController],
  providers: [HomeService],
})
export class HomeModule {}
