import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { CouponProductRelation } from './coupon-product-relation.entity';
import { CouponProductCategoryRelation } from './coupon-product-category-relation.entity';

@Entity('sms_coupon', { schema: 'mallshop' })
export class Coupon {
  @PrimaryGeneratedColumn({ type: 'bigint', name: 'id' })
  id: string;

  @Column('int', {
    name: 'type',
    nullable: true,
    comment: '优惠券类型；0->全场赠券；1->会员赠券；2->购物赠券；3->注册赠券',
  })
  type: number | null;

  @Column('varchar', { name: 'name', nullable: true, length: 100 })
  name: string | null;

  @Column('int', {
    name: 'platform',
    nullable: true,
    comment: '使用平台：0->全部；1->移动；2->PC',
  })
  platform: number | null;

  @Column('int', { name: 'count', nullable: true, comment: '数量' })
  count: number | null;

  @Column('decimal', {
    name: 'amount',
    nullable: true,
    comment: '金额',
    precision: 10,
    scale: 2,
  })
  amount: number | null;

  @Column('int', { name: 'per_limit', nullable: true, comment: '每人限领张数' })
  perLimit: number | null;

  @Column('decimal', {
    name: 'min_point',
    nullable: true,
    comment: '使用门槛；0表示无门槛',
    precision: 10,
    scale: 2,
  })
  minPoint: number | null;

  @Column('datetime', { name: 'start_time', nullable: true })
  startTime: Date | null;

  @Column('datetime', { name: 'end_time', nullable: true })
  endTime: Date | null;

  @Column('int', {
    name: 'use_type',
    nullable: true,
    comment: '使用类型：0->全场通用；1->指定分类；2->指定商品',
  })
  useType: number | null;

  @Column('varchar', {
    name: 'note',
    nullable: true,
    comment: '备注',
    length: 200,
  })
  note: string | null;

  @Column('int', { name: 'publish_count', nullable: true, comment: '发行数量' })
  publishCount: number | null;

  @Column('int', { name: 'use_count', nullable: true, comment: '已使用数量' })
  useCount: number | null;

  @Column('int', { name: 'receive_count', nullable: true, comment: '领取数量' })
  receiveCount: number | null;

  @Column('datetime', {
    name: 'enable_time',
    nullable: true,
    comment: '可以领取的日期',
  })
  enableTime: Date | null;

  @Column('varchar', {
    name: 'code',
    nullable: true,
    comment: '优惠码',
    length: 64,
  })
  code: string | null;

  @Column('int', {
    name: 'member_level',
    nullable: true,
    comment: '可领取的会员类型：0->无限时',
  })
  memberLevel: number | null;

  @OneToMany(
    (type) => CouponProductRelation,
    (couponProductRelation) => couponProductRelation.coupon,
  )
  productRelationList: CouponProductRelation[];

  @OneToMany(
    (type) => CouponProductCategoryRelation,
    (couponProductCategoryRelation) => couponProductCategoryRelation.coupon,
  )
  productCategoryRelationList: CouponProductCategoryRelation[];
}
