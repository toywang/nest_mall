import { ApiProperty } from '@nestjs/swagger';
import { ProductCategory } from '@src/modules/product-category/entities/product-category.entity';
import { type } from 'os';
import {
  BeforeInsert,
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ProductLadder } from './product-ladder.entity';
import { ProductFullReduction } from './product-full-reduction.entity';
import { MemberPrice } from './member-price.entity';
import { SkuStock } from './sku-stock.entity';
import { ProductAttributeValue } from './product-attribute-value.entity';
import { PrefrenceArea } from '@src/modules/prefrence-area/entities/prefrence-area.entity';
import { PrefrenceAreaProductRelation } from './prefrence-area-product-relation.entity';
import { SubjectProductRelation } from './subject-product-relation.entity';

@Entity('pms_product')
export class Product {
  @ApiProperty({ description: '自增 id' })
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @ApiProperty({ description: '品牌 id' })
  @Column({ type: 'bigint', name: 'brand_id' })
  brandId: number;

  @ApiProperty({ description: '类别 id' })
  @Column({ type: 'bigint', name: 'product_category_id' })
  productCategoryId: number;

  @ApiProperty({ description: '模板 id' })
  @Column({ type: 'bigint', name: 'feight_template_id' })
  feightTemplateId: number;

  @ApiProperty({ description: 'sku id' })
  @Column({ type: 'bigint', name: 'product_attribute_category_id' })
  productAttributeCategoryId: number;

  @ApiProperty({ description: '名称' })
  @Column({ length: 200 })
  name: string;

  @ApiProperty({ description: '图片' })
  @Column({ length: 255 })
  pic: string;

  @ApiProperty({ description: '货号' })
  @Column({ length: 64, name: 'product_sn' })
  productSn: string;

  @ApiProperty({ description: '删除状态：0->未删除；1->已删除' })
  @Column({ type: 'int', name: 'delete_status' })
  deleteStatus: number;

  @ApiProperty({ description: '上架状态：0->下架；1->上架' })
  @Column({ type: 'int', name: 'publish_status' })
  publishStatus: number;

  @ApiProperty({ description: '新品状态:0->不是新品；1->新品' })
  @Column({ type: 'int', name: 'new_status' })
  newStatus: number;

  @ApiProperty({ description: '推荐状态；0->不推荐；1->推荐' })
  @Column({ type: 'int', name: 'recommand_status' })
  recommandStatus: number;

  @ApiProperty({ description: '审核状态：0->未审核；1->审核通过' })
  @Column({ type: 'int', name: 'verify_status' })
  verifyStatus: number;

  @ApiProperty({ description: '销量' })
  sale: number;

  @ApiProperty({ description: '排序' })
  @Column({})
  sort: number;

  @ApiProperty({ description: '价格' })
  @Column({ type: 'decimal' })
  price: number;

  @ApiProperty({ description: '促销价格' })
  @Column({ type: 'decimal', name: 'promotion_price' })
  promotionPrice: number;

  @ApiProperty({ description: '市场价' })
  @Column({ type: 'decimal', name: 'original_price' })
  originalPrice: number;

  @ApiProperty({ description: '库存' })
  @Column({ type: 'int' })
  stock: number;

  @ApiProperty({ description: '库存预警值' })
  @Column({ type: 'int', name: 'low_stock' })
  lowStock: number;

  @ApiProperty({ description: '单位' })
  @Column({ length: 16 })
  unit: string;

  @ApiProperty({ description: '商品重量，默认为克' })
  @Column({ type: 'decimal' })
  weight: number;

  @ApiProperty({ description: '赠送的成长值' })
  @Column({ type: 'int', name: 'gift_growth' })
  giftGrowth: number;

  @ApiProperty({ description: '赠送的积分' })
  @Column({ type: 'int', name: 'gift_point' })
  giftPoint: number;

  @ApiProperty({ description: '限制使用的积分数' })
  @Column({ type: 'int', name: 'use_point_limit' })
  usePointLimit: number;

  @ApiProperty({ description: '副标题' })
  @Column({ length: 255, name: 'sub_title' })
  subTitle: string;

  @ApiProperty({ description: '商品描述' })
  @Column({ type: 'text' })
  description: string;

  @ApiProperty({ description: '是否为预告商品：0->不是；1->是' })
  @Column({ type: 'int', name: 'preview_status' })
  previewStatus: number;

  @ApiProperty({
    description: '以逗号分割的产品服务：1->无忧退货；2->快速退款；3->免费包邮',
  })
  @Column({ length: 64, name: 'service_ids' })
  serviceIds: string;

  @ApiProperty({ description: 'keywords' })
  @Column({ length: 255 })
  keywords: string;

  @ApiProperty({ description: '' })
  @Column({ length: 255 })
  note: string;

  @ApiProperty({ description: '画册图片，连产品图片限制为5张，以逗号分割' })
  @Column({ length: 255, name: 'album_pics' })
  albumPics: string;

  @ApiProperty({ description: '' })
  @Column({ length: 255, name: 'detail_title' })
  detailTitle: string;

  @ApiProperty({ description: '' })
  @Column({ type: 'text', name: 'detail_desc' })
  detailDesc: string;

  @ApiProperty({ description: '产品详情网页内容' })
  @Column({ type: 'text', name: 'detail_html' })
  detailHtml: string;

  @ApiProperty({ description: '移动端网页详情' })
  @Column({ type: 'text', name: 'detail_mobile_html' })
  detailMobileHtml: string;

  @ApiProperty({ description: '促销开始时间' })
  @Column({ type: 'datetime', name: 'promotion_start_time' })
  promotionStartTime: Date;

  @ApiProperty({ description: '促销结束时间' })
  @Column({ type: 'datetime', name: 'promotion_end_time' })
  promotionEndTime: Date;

  @ApiProperty({ description: '活动限购数量' })
  @Column({ type: 'int', name: 'promotion_per_limit' })
  promotionPerLimit: number;

  @ApiProperty({
    description:
      '促销类型：0->没有促销使用原价;1->使用促销价；2->使用会员价；3->使用阶梯价格；4->使用满减价格；5->限时购',
  })
  @Column({ type: 'int', name: 'promotion_type' })
  promotionType: number;

  @ApiProperty({ description: '品牌名称' })
  @Column({ length: 255, name: 'brand_name' })
  brandName: string;

  @ApiProperty({ description: '商品分类名称' })
  @Column({ length: 255, name: 'product_category_name' })
  productCategoryName: string;

  @OneToOne(
    (type) => ProductCategory,
    (productCategory) => productCategory.product,
  )
  @JoinColumn({ name: 'product_category_id' })
  productCategory: ProductCategory;

  @OneToMany((type) => ProductLadder, (productLadder) => productLadder.product)
  productLadderList: ProductLadder[];

  @OneToMany(
    (type) => ProductFullReduction,
    (productFullReduction) => productFullReduction.product,
  )
  productFullReductionList: ProductFullReduction[];

  @OneToMany((type) => MemberPrice, (memberPrice) => memberPrice.product)
  memberPriceList: MemberPrice[];

  @OneToMany((type) => SkuStock, (skuStock) => skuStock.product)
  skuStockList: SkuStock[];

  @OneToMany(
    (type) => ProductAttributeValue,
    (attributeValue) => attributeValue.product,
  )
  productAttributeValueList: ProductAttributeValue[];

  @OneToMany(
    (type) => PrefrenceAreaProductRelation,
    (prefrenceAreaProductRelation) => prefrenceAreaProductRelation.product,
  )
  prefrenceAreaProductRelationList: PrefrenceAreaProductRelation[];

  @OneToMany(
    (type) => SubjectProductRelation,
    (subjectProductRelation) => subjectProductRelation.product,
  )
  subjectProductRelationList: SubjectProductRelation[];
}
