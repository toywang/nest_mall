import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('oms_order_setting', { schema: 'mallshop' })
export class OrderSetting {
  @PrimaryGeneratedColumn({ type: 'bigint', name: 'id' })
  id: number;

  @Column('int', {
    name: 'flash_order_overtime',
    nullable: true,
    comment: '秒杀订单超时关闭时间(分)',
  })
  flashOrderOvertime: number | null;

  @Column('int', {
    name: 'normal_order_overtime',
    nullable: true,
    comment: '正常订单超时时间(分)',
  })
  normalOrderOvertime: number | null;

  @Column('int', {
    name: 'confirm_overtime',
    nullable: true,
    comment: '发货后自动确认收货时间（天）',
  })
  confirmOvertime: number | null;

  @Column('int', {
    name: 'finish_overtime',
    nullable: true,
    comment: '自动完成交易时间，不能申请售后（天）',
  })
  finishOvertime: number | null;

  @Column('int', {
    name: 'comment_overtime',
    nullable: true,
    comment: '订单完成后自动好评时间（天）',
  })
  commentOvertime: number | null;
}
