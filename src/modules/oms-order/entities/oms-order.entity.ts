import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { OrderItem } from './order-item.entity';
import { OrderOperateHistory } from './order-operate-history.entity';

@Entity('oms_order', { schema: 'mallshop' })
export class OmsOrder {
  @PrimaryGeneratedColumn({ type: 'bigint', name: 'id', comment: '订单id' })
  id: string;

  @Column('bigint', { name: 'member_id' })
  memberId: string;

  @Column('bigint', { name: 'coupon_id', nullable: true })
  couponId: string | null;

  @Column('varchar', {
    name: 'order_sn',
    nullable: true,
    comment: '订单编号',
    length: 64,
  })
  orderSn: string | null;

  @Column('datetime', {
    name: 'create_time',
    nullable: true,
    comment: '提交时间',
  })
  createTime: Date | null;

  @Column('varchar', {
    name: 'member_username',
    nullable: true,
    comment: '用户帐号',
    length: 64,
  })
  memberUsername: string | null;

  @Column('decimal', {
    name: 'total_amount',
    nullable: true,
    comment: '订单总金额',
    precision: 10,
    scale: 2,
  })
  totalAmount: string | null;

  @Column('decimal', {
    name: 'pay_amount',
    nullable: true,
    comment: '应付金额（实际支付金额）',
    precision: 10,
    scale: 2,
  })
  payAmount: string | null;

  @Column('decimal', {
    name: 'freight_amount',
    nullable: true,
    comment: '运费金额',
    precision: 10,
    scale: 2,
  })
  freightAmount: string | null;

  @Column('decimal', {
    name: 'promotion_amount',
    nullable: true,
    comment: '促销优化金额（促销价、满减、阶梯价）',
    precision: 10,
    scale: 2,
  })
  promotionAmount: string | null;

  @Column('decimal', {
    name: 'integration_amount',
    nullable: true,
    comment: '积分抵扣金额',
    precision: 10,
    scale: 2,
  })
  integrationAmount: string | null;

  @Column('decimal', {
    name: 'coupon_amount',
    nullable: true,
    comment: '优惠券抵扣金额',
    precision: 10,
    scale: 2,
  })
  couponAmount: string | null;

  @Column('decimal', {
    name: 'discount_amount',
    nullable: true,
    comment: '管理员后台调整订单使用的折扣金额',
    precision: 10,
    scale: 2,
  })
  discountAmount: string | null;

  @Column('int', {
    name: 'pay_type',
    nullable: true,
    comment: '支付方式：0->未支付；1->支付宝；2->微信',
  })
  payType: number | null;

  @Column('int', {
    name: 'source_type',
    nullable: true,
    comment: '订单来源：0->PC订单；1->app订单',
  })
  sourceType: number | null;

  @Column('int', {
    name: 'status',
    nullable: true,
    comment:
      '订单状态：0->待付款；1->待发货；2->已发货；3->已完成；4->已关闭；5->无效订单',
  })
  status: number | null;

  @Column('int', {
    name: 'order_type',
    nullable: true,
    comment: '订单类型：0->正常订单；1->秒杀订单',
  })
  orderType: number | null;

  @Column('varchar', {
    name: 'delivery_company',
    nullable: true,
    comment: '物流公司(配送方式)',
    length: 64,
  })
  deliveryCompany: string | null;

  @Column('varchar', {
    name: 'delivery_sn',
    nullable: true,
    comment: '物流单号',
    length: 64,
  })
  deliverySn: string | null;

  @Column('int', {
    name: 'auto_confirm_day',
    nullable: true,
    comment: '自动确认时间（天）',
  })
  autoConfirmDay: number | null;

  @Column('int', {
    name: 'integration',
    nullable: true,
    comment: '可以获得的积分',
  })
  integration: number | null;

  @Column('int', {
    name: 'growth',
    nullable: true,
    comment: '可以活动的成长值',
  })
  growth: number | null;

  @Column('varchar', {
    name: 'promotion_info',
    nullable: true,
    comment: '活动信息',
    length: 100,
  })
  promotionInfo: string | null;

  @Column('int', {
    name: 'bill_type',
    nullable: true,
    comment: '发票类型：0->不开发票；1->电子发票；2->纸质发票',
  })
  billType: number | null;

  @Column('varchar', {
    name: 'bill_header',
    nullable: true,
    comment: '发票抬头',
    length: 200,
  })
  billHeader: string | null;

  @Column('varchar', {
    name: 'bill_content',
    nullable: true,
    comment: '发票内容',
    length: 200,
  })
  billContent: string | null;

  @Column('varchar', {
    name: 'bill_receiver_phone',
    nullable: true,
    comment: '收票人电话',
    length: 32,
  })
  billReceiverPhone: string | null;

  @Column('varchar', {
    name: 'bill_receiver_email',
    nullable: true,
    comment: '收票人邮箱',
    length: 64,
  })
  billReceiverEmail: string | null;

  @Column('varchar', {
    name: 'receiver_name',
    comment: '收货人姓名',
    length: 100,
  })
  receiverName: string;

  @Column('varchar', {
    name: 'receiver_phone',
    comment: '收货人电话',
    length: 32,
  })
  receiverPhone: string;

  @Column('varchar', {
    name: 'receiver_post_code',
    nullable: true,
    comment: '收货人邮编',
    length: 32,
  })
  receiverPostCode: string | null;

  @Column('varchar', {
    name: 'receiver_province',
    nullable: true,
    comment: '省份/直辖市',
    length: 32,
  })
  receiverProvince: string | null;

  @Column('varchar', {
    name: 'receiver_city',
    nullable: true,
    comment: '城市',
    length: 32,
  })
  receiverCity: string | null;

  @Column('varchar', {
    name: 'receiver_region',
    nullable: true,
    comment: '区',
    length: 32,
  })
  receiverRegion: string | null;

  @Column('varchar', {
    name: 'receiver_detail_address',
    nullable: true,
    comment: '详细地址',
    length: 200,
  })
  receiverDetailAddress: string | null;

  @Column('varchar', {
    name: 'note',
    nullable: true,
    comment: '订单备注',
    length: 500,
  })
  note: string | null;

  @Column('int', {
    name: 'confirm_status',
    nullable: true,
    comment: '确认收货状态：0->未确认；1->已确认',
  })
  confirmStatus: number | null;

  @Column('int', {
    name: 'delete_status',
    comment: '删除状态：0->未删除；1->已删除',
    default: () => "'0'",
  })
  deleteStatus: number;

  @Column('int', {
    name: 'use_integration',
    nullable: true,
    comment: '下单时使用的积分',
  })
  useIntegration: number | null;

  @Column('datetime', {
    name: 'payment_time',
    nullable: true,
    comment: '支付时间',
  })
  paymentTime: Date | null;

  @Column('datetime', {
    name: 'delivery_time',
    nullable: true,
    comment: '发货时间',
  })
  deliveryTime: Date | null;

  @Column('datetime', {
    name: 'receive_time',
    nullable: true,
    comment: '确认收货时间',
  })
  receiveTime: Date | null;

  @Column('datetime', {
    name: 'comment_time',
    nullable: true,
    comment: '评价时间',
  })
  commentTime: Date | null;

  @Column('datetime', {
    name: 'modify_time',
    nullable: true,
    comment: '修改时间',
  })
  modifyTime: Date | null;

  @OneToMany((type) => OrderItem, (orderItem) => orderItem.order)
  orderItemList: OrderItem[];

  @OneToMany((type) => OrderOperateHistory, (orderOper) => orderOper.order)
  historyList: OrderOperateHistory[];
}
