import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { OmsOrder } from './oms-order.entity';

@Entity('oms_order_item', { schema: 'mallshop' })
export class OrderItem {
  @PrimaryGeneratedColumn({ type: 'bigint', name: 'id' })
  id: string;

  @Column('bigint', { name: 'order_id', nullable: true, comment: '订单id' })
  orderId: string | null;

  @Column('varchar', {
    name: 'order_sn',
    nullable: true,
    comment: '订单编号',
    length: 64,
  })
  orderSn: string | null;

  @Column('bigint', { name: 'product_id', nullable: true })
  productId: string | null;

  @Column('varchar', { name: 'product_pic', nullable: true, length: 500 })
  productPic: string | null;

  @Column('varchar', { name: 'product_name', nullable: true, length: 200 })
  productName: string | null;

  @Column('varchar', { name: 'product_brand', nullable: true, length: 200 })
  productBrand: string | null;

  @Column('varchar', { name: 'product_sn', nullable: true, length: 64 })
  productSn: string | null;

  @Column('decimal', {
    name: 'product_price',
    nullable: true,
    comment: '销售价格',
    precision: 10,
    scale: 2,
  })
  productPrice: string | null;

  @Column('int', {
    name: 'product_quantity',
    nullable: true,
    comment: '购买数量',
  })
  productQuantity: number | null;

  @Column('bigint', {
    name: 'product_sku_id',
    nullable: true,
    comment: '商品sku编号',
  })
  productSkuId: string | null;

  @Column('varchar', {
    name: 'product_sku_code',
    nullable: true,
    comment: '商品sku条码',
    length: 50,
  })
  productSkuCode: string | null;

  @Column('bigint', {
    name: 'product_category_id',
    nullable: true,
    comment: '商品分类id',
  })
  productCategoryId: string | null;

  @Column('varchar', {
    name: 'promotion_name',
    nullable: true,
    comment: '商品促销名称',
    length: 200,
  })
  promotionName: string | null;

  @Column('decimal', {
    name: 'promotion_amount',
    nullable: true,
    comment: '商品促销分解金额',
    precision: 10,
    scale: 2,
  })
  promotionAmount: string | null;

  @Column('decimal', {
    name: 'coupon_amount',
    nullable: true,
    comment: '优惠券优惠分解金额',
    precision: 10,
    scale: 2,
  })
  couponAmount: string | null;

  @Column('decimal', {
    name: 'integration_amount',
    nullable: true,
    comment: '积分优惠分解金额',
    precision: 10,
    scale: 2,
  })
  integrationAmount: string | null;

  @Column('decimal', {
    name: 'real_amount',
    nullable: true,
    comment: '该商品经过优惠后的分解金额',
    precision: 10,
    scale: 2,
  })
  realAmount: string | null;

  @Column('int', {
    name: 'gift_integration',
    nullable: true,
    default: () => "'0'",
  })
  giftIntegration: number | null;

  @Column('int', { name: 'gift_growth', nullable: true, default: () => "'0'" })
  giftGrowth: number | null;

  @Column('varchar', {
    name: 'product_attr',
    nullable: true,
    comment:
      '商品销售属性:[{key:"颜色",\value:"颜色"},{key:"容量",\value:"4G"}]',
    length: 500,
  })
  productAttr: string | null;

  @ManyToOne((type) => OmsOrder, (order) => order.orderItemList)
  @JoinColumn({ name: 'order_id' })
  order: OmsOrder;
}
