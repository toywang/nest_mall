import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { HomeService } from './home.service';
import { CreateHomeDto } from './dto/create-home.dto';
import { UpdateHomeDto } from './dto/update-home.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { SubjectService } from '../subject/subject.service';
import { BasePageDto } from '@src/common/BasePageDto';
import { CommonResult } from '@src/common/CommonResult';
import { HomeAdvertiseService } from '../home-advertise/home-advertise.service';
import { SearchAdvertiseDto } from '../home-advertise/dto/search-advertise.dto';
import { SkipJwtAuth } from '../auth/constants';
import { HomeBrandService } from '../home-brand/home-brand.service';
import { FlashService } from '../flash/flash.service';
import { HomeNewProduct } from '../home-new-product/entities/home-new-product.entity';
import { HomeNewProductService } from '../home-new-product/home-new-product.service';
import { HomeRecommendProductService } from '../home-recommend-product/home-recommend-product.service';
import { HomeRecommendSubject } from '../home-recommend-subject/entities/home-recommend-subject.entity';
import { HomeRecommendSubjectService } from '../home-recommend-subject/home-recommend-subject.service';
import { HomeSearchBrandDto } from '../home-brand/dto/home-search-brand.dto';
import { HomeNewProductSearchDto } from '../home-new-product/dto/home-new-product-search.dto';
import { ProductSearchDto } from '../home-recommend-product/dto/product-search.dto';
import { SubjectSearchDto } from '../home-recommend-subject/dto/subject-search.dto';

@ApiTags('首页内容管理')
@Controller('home')
export class HomeController {
  constructor(private readonly homeService: HomeService) {}

  @ApiOperation({
    summary: '首页内容信息展示',
  })
  @Get('content')
  @SkipJwtAuth()
  async findHomeContent() {
    //轮播广告
    const advertiseList = await this.homeService.getHomeAdvertiseList(6);

    //推荐品牌
    const brandList = await this.homeService.getRecommendBrandList(4);

    //推荐新品
    const newProductList = await this.homeService.getNewProductList(4);

    //热门产品
    const hotProductList = await this.homeService.getHotProductList(4);

    //推荐专题
    const subjectList = await this.homeService.getRecommendSubjectList(4);

    return {
      advertiseList: advertiseList[0],
      brandList: brandList,
      homeFlashPromotion: [],
      newProductList: newProductList,
      hotProductList: hotProductList,
      subjectList: subjectList,
    };

    //秒杀
    const homeFlashPromotion = await this.homeService.getHomeFlashPromotion(
      0,
      4,
    );
  }

  @ApiOperation({
    summary: '分页获取推荐商品',
  })
  @SkipJwtAuth()
  @Get('recommendProductList')
  async recommendProductList(@Query() page: BasePageDto) {
    const list = await this.homeService.recommendProductList(page);
    return list[0];
  }
}
