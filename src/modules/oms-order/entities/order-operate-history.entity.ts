import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { OmsOrder } from './oms-order.entity';

@Entity('oms_order_operate_history', { schema: 'mallshop' })
export class OrderOperateHistory {
  @PrimaryGeneratedColumn({ type: 'bigint', name: 'id' })
  id: string;

  @Column('bigint', { name: 'order_id', nullable: true, comment: '订单id' })
  orderId: string | null;

  @Column('varchar', {
    name: 'operate_man',
    nullable: true,
    comment: '操作人：用户；系统；后台管理员',
    length: 100,
  })
  operateMan: string | null;

  @Column('datetime', {
    name: 'create_time',
    nullable: true,
    comment: '操作时间',
  })
  createTime: Date | null;

  @Column('int', {
    name: 'order_status',
    nullable: true,
    comment:
      '订单状态：0->待付款；1->待发货；2->已发货；3->已完成；4->已关闭；5->无效订单',
  })
  orderStatus: number | null;

  @Column('varchar', {
    name: 'note',
    nullable: true,
    comment: '备注',
    length: 500,
  })
  note: string | null;

  @ManyToOne((type) => OmsOrder, (order) => order.historyList)
  @JoinColumn({ name: 'order_id' })
  order: OmsOrder;
}
