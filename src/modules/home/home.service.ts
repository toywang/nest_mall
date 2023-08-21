import { Injectable } from '@nestjs/common';
import { CreateHomeDto } from './dto/create-home.dto';
import { UpdateHomeDto } from './dto/update-home.dto';
import { ApiOperation } from '@nestjs/swagger';
import { BasePageDto } from '@src/common/BasePageDto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, getRepository } from 'typeorm';
import { Subject } from '../subject/entities/subject.entity';
import { HomeBrand } from '../home-brand/entities/home-brand.entity';
import { PmsBrand } from './entities/pms-brand.entity';
import { HomeAdvertise } from '../home-advertise/entities/home-advertise.entity';
import { HomeNewProduct } from '../home-new-product/entities/home-new-product.entity';
import { PmsProduct } from './entities/pms-product.entity';
import { HomeRecommendProduct } from '../home-recommend-product/entities/home-recommend-product.entity';
import { HomeRecommendSubject } from '../home-recommend-subject/entities/home-recommend-subject.entity';
import { Product } from '../product/entities/product.entity';

@Injectable()
export class HomeService {
  constructor(
    @InjectRepository(HomeAdvertise)
    private adRepository: Repository<HomeAdvertise>,
    @InjectRepository(HomeBrand)
    private brandRepository: Repository<HomeBrand>,
    @InjectRepository(HomeNewProduct)
    private newProductRepository: Repository<HomeNewProduct>,
    @InjectRepository(HomeRecommendProduct)
    private hotProductRepository: Repository<HomeRecommendProduct>,
    @InjectRepository(HomeRecommendSubject)
    private reSubjectRepository: Repository<HomeRecommendSubject>,
    @InjectRepository(Product)
    private proRepository: Repository<Product>,
  ) {}

  /**推荐广告 */
  async getHomeAdvertiseList(limit) {
    const queryFilter: any = {
      type: 1,
      status: 1,
    };
    const res = await this.adRepository.findAndCount({
      // 查询条件
      where: queryFilter,
      // 每页条数
      take: limit,
      // 是否缓存
      cache: true,
    });
    return res;
  }
  //推荐品牌
  async getRecommendBrandList(limit) {
    const sql = await getRepository(HomeBrand)
      .createQueryBuilder('hb')
      .leftJoinAndSelect(PmsBrand, 'b', 'b.id = hb.brandId')
      .where('hb.recommendStatus = 1 and b.showStatus=1')
      .orderBy('hb.sort', 'DESC')
      .select(
        `
       b.id as id,
       b.name as name,
       b.firstLetter as firstLetter, 
       b.factoryStatus as factoryStatus, 
       b.showStatus as showStatus, 
       b.productCount as productCount, 
       b.productCommentCount as productCommentCount, 
       b.logo as logo,
       b.bigPic as bigPic,
       b.brandStory as brandStory
      `,
      )
      .take(limit)
      .printSql()
      .getRawMany();
    return sql;
  }
  /**
   * 获取秒杀信息
   * @param limit
   * @param offset
   * @returns
   */
  async getHomeFlashPromotion(limit, offset) {
    const sql = await this.brandRepository
      .createQueryBuilder('hb')
      .leftJoinAndSelect(PmsBrand, 'b', 'b.id = hb.brandId')
      .where('hb.recommendStatus = 1 and b.showStatus=1')
      .orderBy('hb.sort', 'DESC')
      .limit(limit)
      .offset(offset)
      .getMany();
    return sql;
  }
  /**
   * 获取新品推荐
   * @param limit
   * @param offset
   * @returns
   */
  async getNewProductList(limit) {
    const sql = await this.newProductRepository
      .createQueryBuilder('np')
      .leftJoinAndSelect(PmsProduct, 'p', 'p.id = np.productId')
      .where('np.recommendStatus = 1 and p.publishStatus=1')
      .orderBy('np.sort', 'DESC')
      .select(
        `
       p.id as id,
       p.brandId as brandId,
       p.productCategoryId as productCategoryId,
       p.feightTemplateId as feightTemplateId,
       p.productAttributeCategoryId as productAttributeCategoryId,
       p.name as name,
       p.productSn as productSn,
       p.deleteStatus as deleteStatus,
       p.publishStatus as publishStatus,
       p.newStatus as newStatus,
       p.recommandStatus as recommandStatus,
       p.verifyStatus as verifyStatus,
       p.sort as sort,
       p.sale as sale,
       p.price as price,
       p.promotionPrice as promotionPrice,
       p.giftGrowth as giftGrowth,
       p.giftPoint as giftPoint,
       p.usePointLimit as usePointLimit,
       p.subTitle as subTitle,
       p.description as description,
       p.originalPrice as originalPrice,
       p.stock as stock,
       p.lowStock as lowStock,
       p.unit as unit,
       p.weight as weight,
       p.previewStatus as previewStatus,
       p.serviceIds as serviceIds,
       p.keywords as keywords,
       p.note as note,
       p.albumPics as albumPics,
       p.detailTitle as detailTitle,
       p.detailDesc as detailDesc,
       p.detailHtml as detailHtml,
       p.detailMobileHtml as detailMobileHtml,
       p.promotionStartTime as promotionStartTime,
       p.promotionEndTime as promotionEndTime,
       p.promotionPerLimit as promotionPerLimit,
       p.promotionType as promotionType,
       p.brandName as brandName,
       p.productCategoryName as productCategoryName
      `,
      )
      .take(limit)
      .getRawMany();
    return sql;
  }
  /**
   * 获取人气推荐
   * @param limit
   * @param offset
   * @returns
   */
  async getHotProductList(limit) {
    const sql = await this.hotProductRepository
      .createQueryBuilder('hp')
      .leftJoinAndSelect(PmsProduct, 'p', 'p.id = hp.productId')
      .where('hp.recommendStatus = 1 and p.publishStatus=1')
      .orderBy('hp.sort', 'DESC')
      .select(
        `
       p.id as id,
       p.brandId as brandId,
       p.productCategoryId as productCategoryId,
       p.feightTemplateId as feightTemplateId,
       p.productAttributeCategoryId as productAttributeCategoryId,
       p.name as name,
       p.productSn as productSn,
       p.deleteStatus as deleteStatus,
       p.publishStatus as publishStatus,
       p.newStatus as newStatus,
       p.recommandStatus as recommandStatus,
       p.verifyStatus as verifyStatus,
       p.sort as sort,
       p.sale as sale,
       p.price as price,
       p.promotionPrice as promotionPrice,
       p.giftGrowth as giftGrowth,
       p.giftPoint as giftPoint,
       p.usePointLimit as usePointLimit,
       p.subTitle as subTitle,
       p.description as description,
       p.originalPrice as originalPrice,
       p.stock as stock,
       p.lowStock as lowStock,
       p.unit as unit,
       p.weight as weight,
       p.previewStatus as previewStatus,
       p.serviceIds as serviceIds,
       p.keywords as keywords,
       p.note as note,
       p.albumPics as albumPics,
       p.detailTitle as detailTitle,
       p.detailDesc as detailDesc,
       p.detailHtml as detailHtml,
       p.detailMobileHtml as detailMobileHtml,
       p.promotionStartTime as promotionStartTime,
       p.promotionEndTime as promotionEndTime,
       p.promotionPerLimit as promotionPerLimit,
       p.promotionType as promotionType,
       p.brandName as brandName,
       p.productCategoryName as productCategoryName
      `,
      )
      .take(limit)
      .getRawMany();
    return sql;
  }
  /**
   * 获取推荐专题
   * @param limit
   * @param offset
   * @returns
   */
  async getRecommendSubjectList(limit) {
    const sql = await this.reSubjectRepository
      .createQueryBuilder('res')
      .leftJoinAndSelect(Subject, 's', 's.id = res.subjectId')
      .where('res.recommendStatus = 1 and s.showStatus=1')
      .orderBy('res.sort', 'DESC')
      .select(
        `
       s.id as id,
       s.categoryId as categoryId,
       s.title as title,
       s.pic as pic,
       s.productCount as productCount,
       s.recommendStatus as recommendStatus,
       s.createTime as createTime,
       s.collectCount as collectCount,
       s.readCount as readCount,
       s.commentCount as commentCount,
       s.albumPics as albumPics,
       s.description as description,
       s.showStatus as showStatus,
       s.content as content,
       s.forwardCount as forwardCount,
       s.categoryName as categoryName

      `,
      )
      .printSql()
      .take(limit)
      .getRawMany();
    return sql;
  }
  /**
   * 分页获取推荐商品
   */
  async recommendProductList(page: BasePageDto) {
    const { pageSize, pageNum } = page;
    const queryFilter: any = {};
    queryFilter.deleteStatus = 0;
    queryFilter.publishStatus = 1;

    const res = await this.proRepository.findAndCount({
      // 查询条件
      where: queryFilter,
      // offset，分页的偏移量
      skip: (pageNum - 1) * pageSize,
      // 每页条数
      take: pageSize,
      // 是否缓存
      cache: true,
    });
    return res;
  }
}
