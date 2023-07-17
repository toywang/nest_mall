import { ApiProperty } from '@nestjs/swagger';
import { BeforeInsert, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('pms_product')
export class Product {
  @ApiProperty({ description: '自增 id' })
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @ApiProperty({ description: '品牌 id' })
  @Column({ type: 'bigint' })
  brand_id: number;

  @ApiProperty({ description: '类别 id' })
  @Column({ type: 'bigint' })
  product_category_id: number;

  @ApiProperty({ description: '模板 id' })
  @Column({ type: 'bigint' })
  feight_template_id: number;

  @ApiProperty({ description: 'sku id' })
  @Column({ type: 'bigint' })
  product_attribute_category_id: number;

  @ApiProperty({ description: '名称' })
  @Column({ length: 200 })
  name: string;

  @ApiProperty({ description: '图片' })
  @Column({ length: 255 })
  pic: string;

  @ApiProperty({ description: '货号' })
  @Column({ length: 64 })
  product_sn: string;

  @ApiProperty({ description: '删除状态：0->未删除；1->已删除' })
  @Column({ type: 'int' })
  delete_status: number;

  @ApiProperty({ description: '上架状态：0->下架；1->上架' })
  @Column({ type: 'int' })
  publish_status: number;

  @ApiProperty({ description: '新品状态:0->不是新品；1->新品' })
  @Column({ type: 'int' })
  new_status: number;

  @ApiProperty({ description: '推荐状态；0->不推荐；1->推荐' })
  @Column({ type: 'int' })
  recommand_status: number;

  @ApiProperty({ description: '审核状态：0->未审核；1->审核通过' })
  @Column({ type: 'int' })
  verify_status: number;

  @ApiProperty({ description: '销量' })
  sale: number;

  @ApiProperty({ description: '排序' })
  @Column({})
  sort: number;

  @ApiProperty({ description: '价格' })
  @Column({ type: 'decimal' })
  price: number;

  @ApiProperty({ description: '促销价格' })
  @Column({ type: 'decimal' })
  promotion_price: number;

  @ApiProperty({ description: '市场价' })
  @Column({ type: 'decimal' })
  original_price: number;

  @ApiProperty({ description: '库存' })
  @Column({ type: 'int' })
  stock: number;

  @ApiProperty({ description: '库存预警值' })
  @Column({ type: 'int' })
  low_stock: number;

  @ApiProperty({ description: '单位' })
  @Column({ length: 16 })
  unit: string;

  @ApiProperty({ description: '商品重量，默认为克' })
  @Column({ type: 'decimal' })
  weight: number;

  @ApiProperty({ description: '赠送的成长值' })
  @Column({ type: 'int' })
  gift_growth: number;

  @ApiProperty({ description: '赠送的积分' })
  @Column({ type: 'int' })
  gift_point: number;

  @ApiProperty({ description: '限制使用的积分数' })
  @Column({ type: 'int' })
  use_point_limit: number;

  @ApiProperty({ description: '副标题' })
  @Column({ length: 255 })
  sub_title: string;

  @ApiProperty({ description: '描述' })
  description: string;

  @ApiProperty({ description: '是否为预告商品：0->不是；1->是' })
  @Column({ type: 'int' })
  preview_status: number;

  @ApiProperty({
    description: '以逗号分割的产品服务：1->无忧退货；2->快速退款；3->免费包邮',
  })
  @Column({ length: 64 })
  service_ids: string;

  @ApiProperty({ description: 'keywords' })
  @Column({ length: 255 })
  keywords: string;

  @ApiProperty({ description: '' })
  @Column({ length: 255 })
  note: string;

  @ApiProperty({ description: '画册图片，连产品图片限制为5张，以逗号分割' })
  @Column({ length: 255 })
  album_pics: string;

  @ApiProperty({ description: '' })
  @Column({ length: 255 })
  detail_title: string;

  @ApiProperty({ description: '' })
  detail_desc: string;

  @ApiProperty({ description: '产品详情网页内容' })
  detail_html: string;

  @ApiProperty({ description: '移动端网页详情' })
  detail_mobile_html: string;

  @ApiProperty({ description: '促销开始时间' })
  promotion_start_time: Date;

  @ApiProperty({ description: '促销结束时间' })
  promotion_end_time: Date;

  @ApiProperty({ description: '活动限购数量' })
  @Column({ type: 'int' })
  promotion_per_limit: number;

  @ApiProperty({
    description:
      '促销类型：0->没有促销使用原价;1->使用促销价；2->使用会员价；3->使用阶梯价格；4->使用满减价格；5->限时购',
  })
  @Column({ type: 'int' })
  promotion_type: number;

  @ApiProperty({ description: '品牌名称' })
  @Column({ length: 255 })
  brand_name: string;

  @ApiProperty({ description: '商品分类名称' })
  @Column({ length: 255 })
  product_category_name: string;
}
