import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('pms_product', { schema: 'mallshop' })
export class PmsProduct {
  @PrimaryGeneratedColumn({ type: 'bigint', name: 'id' })
  id: string;

  @Column('bigint', { name: 'brand_id', nullable: true })
  brandId: string | null;

  @Column('bigint', { name: 'product_category_id', nullable: true })
  productCategoryId: string | null;

  @Column('bigint', { name: 'feight_template_id', nullable: true })
  feightTemplateId: string | null;

  @Column('bigint', { name: 'product_attribute_category_id', nullable: true })
  productAttributeCategoryId: string | null;

  @Column('varchar', { name: 'name', length: 200 })
  name: string;

  @Column('varchar', { name: 'pic', nullable: true, length: 255 })
  pic: string | null;

  @Column('varchar', { name: 'product_sn', comment: '货号', length: 64 })
  productSn: string;

  @Column('int', {
    name: 'delete_status',
    nullable: true,
    comment: '删除状态：0->未删除；1->已删除',
  })
  deleteStatus: number | null;

  @Column('int', {
    name: 'publish_status',
    nullable: true,
    comment: '上架状态：0->下架；1->上架',
  })
  publishStatus: number | null;

  @Column('int', {
    name: 'new_status',
    nullable: true,
    comment: '新品状态:0->不是新品；1->新品',
  })
  newStatus: number | null;

  @Column('int', {
    name: 'recommand_status',
    nullable: true,
    comment: '推荐状态；0->不推荐；1->推荐',
  })
  recommandStatus: number | null;

  @Column('int', {
    name: 'verify_status',
    nullable: true,
    comment: '审核状态：0->未审核；1->审核通过',
  })
  verifyStatus: number | null;

  @Column('int', { name: 'sort', nullable: true, comment: '排序' })
  sort: number | null;

  @Column('int', { name: 'sale', nullable: true, comment: '销量' })
  sale: number | null;

  @Column('decimal', { name: 'price', nullable: true, precision: 10, scale: 2 })
  price: string | null;

  @Column('decimal', {
    name: 'promotion_price',
    nullable: true,
    comment: '促销价格',
    precision: 10,
    scale: 2,
  })
  promotionPrice: string | null;

  @Column('int', {
    name: 'gift_growth',
    nullable: true,
    comment: '赠送的成长值',
    default: () => "'0'",
  })
  giftGrowth: number | null;

  @Column('int', {
    name: 'gift_point',
    nullable: true,
    comment: '赠送的积分',
    default: () => "'0'",
  })
  giftPoint: number | null;

  @Column('int', {
    name: 'use_point_limit',
    nullable: true,
    comment: '限制使用的积分数',
  })
  usePointLimit: number | null;

  @Column('varchar', {
    name: 'sub_title',
    nullable: true,
    comment: '副标题',
    length: 255,
  })
  subTitle: string | null;

  @Column('text', { name: 'description', nullable: true, comment: '商品描述' })
  description: string | null;

  @Column('decimal', {
    name: 'original_price',
    nullable: true,
    comment: '市场价',
    precision: 10,
    scale: 2,
  })
  originalPrice: string | null;

  @Column('int', { name: 'stock', nullable: true, comment: '库存' })
  stock: number | null;

  @Column('int', { name: 'low_stock', nullable: true, comment: '库存预警值' })
  lowStock: number | null;

  @Column('varchar', {
    name: 'unit',
    nullable: true,
    comment: '单位',
    length: 16,
  })
  unit: string | null;

  @Column('decimal', {
    name: 'weight',
    nullable: true,
    comment: '商品重量，默认为克',
    precision: 10,
    scale: 2,
  })
  weight: string | null;

  @Column('int', {
    name: 'preview_status',
    nullable: true,
    comment: '是否为预告商品：0->不是；1->是',
  })
  previewStatus: number | null;

  @Column('varchar', {
    name: 'service_ids',
    nullable: true,
    comment: '以逗号分割的产品服务：1->无忧退货；2->快速退款；3->免费包邮',
    length: 64,
  })
  serviceIds: string | null;

  @Column('varchar', { name: 'keywords', nullable: true, length: 255 })
  keywords: string | null;

  @Column('varchar', { name: 'note', nullable: true, length: 255 })
  note: string | null;

  @Column('varchar', {
    name: 'album_pics',
    nullable: true,
    comment: '画册图片，连产品图片限制为5张，以逗号分割',
    length: 255,
  })
  albumPics: string | null;

  @Column('varchar', { name: 'detail_title', nullable: true, length: 255 })
  detailTitle: string | null;

  @Column('text', { name: 'detail_desc', nullable: true })
  detailDesc: string | null;

  @Column('text', {
    name: 'detail_html',
    nullable: true,
    comment: '产品详情网页内容',
  })
  detailHtml: string | null;

  @Column('text', {
    name: 'detail_mobile_html',
    nullable: true,
    comment: '移动端网页详情',
  })
  detailMobileHtml: string | null;

  @Column('datetime', {
    name: 'promotion_start_time',
    nullable: true,
    comment: '促销开始时间',
  })
  promotionStartTime: Date | null;

  @Column('datetime', {
    name: 'promotion_end_time',
    nullable: true,
    comment: '促销结束时间',
  })
  promotionEndTime: Date | null;

  @Column('int', {
    name: 'promotion_per_limit',
    nullable: true,
    comment: '活动限购数量',
  })
  promotionPerLimit: number | null;

  @Column('int', {
    name: 'promotion_type',
    nullable: true,
    comment:
      '促销类型：0->没有促销使用原价;1->使用促销价；2->使用会员价；3->使用阶梯价格；4->使用满减价格；5->限时购',
  })
  promotionType: number | null;

  @Column('varchar', {
    name: 'brand_name',
    nullable: true,
    comment: '品牌名称',
    length: 255,
  })
  brandName: string | null;

  @Column('varchar', {
    name: 'product_category_name',
    nullable: true,
    comment: '商品分类名称',
    length: 255,
  })
  productCategoryName: string | null;
}
