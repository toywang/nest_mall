import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Coupon } from './coupon.entity';

@Entity('sms_coupon_product_category_relation', { schema: 'mallshop' })
export class CouponProductCategoryRelation {
  @PrimaryGeneratedColumn({ type: 'bigint', name: 'id' })
  id: string;

  @Column('bigint', { name: 'coupon_id', nullable: true })
  couponId: string | null;

  @Column('bigint', { name: 'product_category_id', nullable: true })
  productCategoryId: string | null;

  @Column('varchar', {
    name: 'product_category_name',
    nullable: true,
    comment: '产品分类名称',
    length: 200,
  })
  productCategoryName: string | null;

  @Column('varchar', {
    name: 'parent_category_name',
    nullable: true,
    comment: '父分类名称',
    length: 200,
  })
  parentCategoryName: string | null;

  @ManyToOne((type) => Coupon, (coupon) => coupon.productCategoryRelationList)
  @JoinColumn({ name: 'coupon_id' })
  coupon: Coupon;
}
