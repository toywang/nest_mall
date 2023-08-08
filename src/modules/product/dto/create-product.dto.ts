import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsArray,
  IsDateString,
  IsNotEmpty,
  IsNumber,
  IsObject,
  IsOptional,
  IsString,
} from 'class-validator';
import { ProductLadder } from '../entities/product-ladder.entity';
import { SkuStock } from '../entities/sku-stock.entity';
import { MemberPrice } from '../entities/member-price.entity';
import { ProductAttribute } from '@src/modules/product-attribute/entities/product-attribute.entity';
import { ProductFullReduction } from '../entities/product-full-reduction.entity';
import { PrefrenceAreaProductRelation } from '../entities/prefrence-area-product-relation.entity';
import { SubjectProductRelation } from '../entities/subject-product-relation.entity';
import { ProductAttributeValue } from '../entities/product-attribute-value.entity';

export class CreateProductDto {
  @ApiProperty({ type: Number, description: '品牌ID' })
  @IsNumber()
  @IsNotEmpty({ message: '品牌ID不能为空' })
  @Type(() => Number)
  brandId: number;

  @ApiProperty({ type: Number, description: '分类ID' })
  @IsNumber()
  @Type(() => Number)
  @IsNotEmpty({ message: '分类ID不能为空' })
  productCategoryId: number;

  @ApiProperty({ type: Number, description: '模板ID' })
  @IsNumber()
  @Type(() => Number)
  feightTemplateId: number;

  @ApiProperty({ type: Number, description: '属性分类ID' })
  @IsNumber()
  @Type(() => Number)
  productAttributeCategoryId: number;

  @ApiProperty({ type: Number, description: '商品名称' })
  @IsString()
  name: string;

  @ApiProperty({ type: Number, description: '商品图片' })
  @IsString()
  pic: string;

  @ApiProperty({ type: Number, description: '商品货号' })
  @IsString()
  productSn: string;

  @ApiProperty({ type: Number, description: '上架状态：0->下架；1->上架' })
  @IsNumber()
  @Type(() => Number)
  publishStatus: number;

  @ApiProperty({ type: Number, description: '新品状态:0->不是新品；1->新品' })
  @IsNumber()
  @Type(() => Number)
  newStatus: number;

  @ApiProperty({ type: Number, description: '推荐状态；0->不推荐；1->推荐' })
  @IsNumber()
  @Type(() => Number)
  recommandStatus: number;

  @ApiProperty({ description: '' })
  @ApiProperty({
    type: Number,
    description: '不需要传，新建的时候默认0 审核状态：0->未审核；1->审核通过',
  })
  @IsNumber()
  @Type(() => Number)
  verifyStatus: number;

  @ApiProperty({ description: '销量' })
  sale: number;

  @ApiProperty({
    type: Number,
    description: '排序',
  })
  @IsNumber()
  @Type(() => Number)
  sort: number;

  @ApiProperty({
    type: Number,
    description: '价格',
  })
  @IsNumber()
  @Type(() => Number)
  price: number;

  @ApiProperty({
    type: Number,
    description: '促销价格',
  })
  @IsNumber()
  @Type(() => Number)
  @IsNotEmpty()
  promotionPrice: number;

  @ApiProperty({
    type: Number,
    description: '市场价',
  })
  @IsNumber()
  @Type(() => Number)
  @IsNotEmpty()
  originalPrice: number;

  @ApiProperty({
    type: Number,
    description: '库存',
  })
  @IsNotEmpty()
  @IsNumber()
  @Type(() => Number)
  stock: number;

  @ApiProperty({
    type: Number,
    description: '库存预警值',
  })
  @IsNumber()
  @Type(() => Number)
  lowStock: number;

  @ApiProperty({
    type: String,
    description: '单位',
  })
  @IsString()
  unit: string;

  @ApiProperty({
    type: Number,
    description: '商品重量，默认为克',
  })
  @IsNumber()
  @Type(() => Number)
  weight: number;

  @ApiProperty({
    type: Number,
    description: '赠送的成长值',
  })
  @IsNumber()
  @Type(() => Number)
  giftGrowth: number;

  @ApiProperty({
    type: Number,
    description: '赠送的积分',
  })
  @IsNumber()
  @Type(() => Number)
  giftPoint: number;

  @ApiProperty({
    type: Number,
    description: '限制使用的积分数',
  })
  @IsNumber()
  @Type(() => Number)
  usePointLimit: number;

  @ApiProperty({
    type: String,
    description: '副标题',
  })
  @IsString()
  subTitle: string;

  @ApiProperty({
    type: String,
    description: '描述',
  })
  @IsOptional()
  @IsString()
  description: string;

  @ApiProperty({
    type: Number,
    description: '是否为预告商品：0->不是；1->是',
  })
  @IsNumber()
  @Type(() => Number)
  previewStatus: number;

  @ApiProperty({
    type: String,
    description: '以逗号分割的产品服务：1->无忧退货；2->快速退款；3->免费包邮',
  })
  @IsString()
  serviceIds: string;

  @ApiProperty({
    type: String,
  })
  @IsString()
  keywords: string;

  @ApiProperty({
    type: String,
  })
  @IsString()
  note: string;

  @ApiProperty({
    type: String,
    description: '画册图片，连产品图片限制为5张，以逗号分割',
  })
  @IsString()
  albumPics: string;

  @ApiProperty({
    type: String,
  })
  @IsString()
  detailTitle: string;

  @ApiProperty({
    type: String,
  })
  @IsString()
  detailDesc: string;

  @ApiProperty({
    type: String,
    description: '产品详情网页内容',
  })
  @IsString()
  detailHtml: string;

  @ApiProperty({
    type: String,
    description: '移动端网页详情',
  })
  @IsString()
  detailMobileHtml: string;

  @ApiProperty({
    type: Date,
    description: '促销开始时间',
  })
  @IsDateString()
  promotionStartTime: Date;

  @ApiProperty({
    type: Date,
    description: '促销结束时间',
  })
  @IsDateString()
  promotionEndTime: Date;

  @ApiProperty({
    type: Number,
    description: '活动限购数量',
  })
  @IsNumber()
  @Type(() => Number)
  promotionPerLimit: number;

  @ApiProperty({
    type: Number,
    description:
      '促销类型：0->没有促销使用原价;1->使用促销价；2->使用会员价；3->使用阶梯价格；4->使用满减价格；5->限时购',
  })
  @IsNumber()
  @Type(() => Number)
  promotionType: number;

  @ApiProperty({
    type: String,
    description: '品牌名称',
  })
  @IsString()
  brandName: string;

  @ApiProperty({
    type: String,
    description: '商品分类名称',
  })
  @IsString()
  productCategoryName: string;

  @ApiProperty({
    type: Object,
  })
  @IsObject()
  @IsOptional()
  productCategory: object;

  @ApiProperty({
    type: Array,
    description: '商品阶梯价格设置',
  })
  @IsArray()
  productLadderList: ProductLadder[];

  @ApiProperty({
    type: Array,
    description: '商品满减价格设置',
  })
  @IsArray()
  productFullReductionList: ProductFullReduction[];

  @ApiProperty({
    type: Array,
    description: '商品会员价格设置',
  })
  @IsArray()
  memberPriceList: MemberPrice[];

  @ApiProperty({
    type: Array,
    description: '商品的sku库存信息',
  })
  @IsArray()
  skuStockList: SkuStock[];

  @ApiProperty({
    type: Array,
    description: '商品参数及自定义规格属性',
  })
  @IsArray()
  productAttributeValueList: ProductAttributeValue[];

  @ApiProperty({
    type: Array,
    description: '优选专区和商品的关系',
  })
  @IsArray()
  prefrenceAreaProductRelationList: PrefrenceAreaProductRelation[];

  @ApiProperty({
    type: Array,
    description: '专题和商品关系',
  })
  @IsArray()
  subjectProductRelationList: SubjectProductRelation[];
}
