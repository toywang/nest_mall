import { Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';

@Index('idx_coupon_id', ['couponId'], {})
@Index('idx_member_id', ['memberId'], {})
@Entity('sms_coupon_history', { schema: 'mallshop' })
export class CouponHistory {
  @PrimaryGeneratedColumn({ type: 'bigint', name: 'id' })
  id: string;

  @Column('bigint', { name: 'coupon_id', nullable: true })
  couponId: string | null;

  @Column('bigint', { name: 'member_id', nullable: true })
  memberId: string | null;

  @Column('varchar', { name: 'coupon_code', nullable: true, length: 64 })
  couponCode: string | null;

  @Column('varchar', {
    name: 'member_nickname',
    nullable: true,
    comment: '领取人昵称',
    length: 64,
  })
  memberNickname: string | null;

  @Column('int', {
    name: 'get_type',
    nullable: true,
    comment: '获取类型：0->后台赠送；1->主动获取',
  })
  getType: number | null;

  @Column('datetime', { name: 'create_time', nullable: true })
  createTime: Date | null;

  @Column('int', {
    name: 'use_status',
    nullable: true,
    comment: '使用状态：0->未使用；1->已使用；2->已过期',
  })
  useStatus: number | null;

  @Column('datetime', { name: 'use_time', nullable: true, comment: '使用时间' })
  useTime: Date | null;

  @Column('bigint', { name: 'order_id', nullable: true, comment: '订单编号' })
  orderId: string | null;

  @Column('varchar', {
    name: 'order_sn',
    nullable: true,
    comment: '订单号码',
    length: 100,
  })
  orderSn: string | null;
}
