import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('oms_order_return_apply', { schema: 'mallshop' })
export class ReturnApply {
  @PrimaryGeneratedColumn({ type: 'bigint', name: 'id' })
  id: string;

  @Column('bigint', { name: 'order_id', nullable: true, comment: '订单id' })
  orderId: string | null;

  @Column('bigint', {
    name: 'company_address_id',
    nullable: true,
    comment: '收货地址表id',
  })
  companyAddressId: string | null;

  @Column('bigint', {
    name: 'product_id',
    nullable: true,
    comment: '退货商品id',
  })
  productId: string | null;

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
    comment: '申请时间',
  })
  createTime: Date | null;

  @Column('varchar', {
    name: 'member_username',
    nullable: true,
    comment: '会员用户名',
    length: 64,
  })
  memberUsername: string | null;

  @Column('decimal', {
    name: 'return_amount',
    nullable: true,
    comment: '退款金额',
    precision: 10,
    scale: 2,
  })
  returnAmount: string | null;

  @Column('varchar', {
    name: 'return_name',
    nullable: true,
    comment: '退货人姓名',
    length: 100,
  })
  returnName: string | null;

  @Column('varchar', {
    name: 'return_phone',
    nullable: true,
    comment: '退货人电话',
    length: 100,
  })
  returnPhone: string | null;

  @Column('int', {
    name: 'status',
    nullable: true,
    comment: '申请状态：0->待处理；1->退货中；2->已完成；3->已拒绝',
  })
  status: number | null;

  @Column('datetime', {
    name: 'handle_time',
    nullable: true,
    comment: '处理时间',
  })
  handleTime: Date | null;

  @Column('varchar', {
    name: 'product_pic',
    nullable: true,
    comment: '商品图片',
    length: 500,
  })
  productPic: string | null;

  @Column('varchar', {
    name: 'product_name',
    nullable: true,
    comment: '商品名称',
    length: 200,
  })
  productName: string | null;

  @Column('varchar', {
    name: 'product_brand',
    nullable: true,
    comment: '商品品牌',
    length: 200,
  })
  productBrand: string | null;

  @Column('varchar', {
    name: 'product_attr',
    nullable: true,
    comment: '商品销售属性：颜色：红色；尺码：xl;',
    length: 500,
  })
  productAttr: string | null;

  @Column('int', { name: 'product_count', nullable: true, comment: '退货数量' })
  productCount: number | null;

  @Column('decimal', {
    name: 'product_price',
    nullable: true,
    comment: '商品单价',
    precision: 10,
    scale: 2,
  })
  productPrice: string | null;

  @Column('decimal', {
    name: 'product_real_price',
    nullable: true,
    comment: '商品实际支付单价',
    precision: 10,
    scale: 2,
  })
  productRealPrice: string | null;

  @Column('varchar', {
    name: 'reason',
    nullable: true,
    comment: '原因',
    length: 200,
  })
  reason: string | null;

  @Column('varchar', {
    name: 'description',
    nullable: true,
    comment: '描述',
    length: 500,
  })
  description: string | null;

  @Column('varchar', {
    name: 'proof_pics',
    nullable: true,
    comment: '凭证图片，以逗号隔开',
    length: 1000,
  })
  proofPics: string | null;

  @Column('varchar', {
    name: 'handle_note',
    nullable: true,
    comment: '处理备注',
    length: 500,
  })
  handleNote: string | null;

  @Column('varchar', {
    name: 'handle_man',
    nullable: true,
    comment: '处理人员',
    length: 100,
  })
  handleMan: string | null;

  @Column('varchar', {
    name: 'receive_man',
    nullable: true,
    comment: '收货人',
    length: 100,
  })
  receiveMan: string | null;

  @Column('datetime', {
    name: 'receive_time',
    nullable: true,
    comment: '收货时间',
  })
  receiveTime: Date | null;

  @Column('varchar', {
    name: 'receive_note',
    nullable: true,
    comment: '收货备注',
    length: 500,
  })
  receiveNote: string | null;
}
