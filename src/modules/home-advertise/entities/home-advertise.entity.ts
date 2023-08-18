import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('sms_home_advertise', { schema: 'mallshop' })
export class HomeAdvertise {
  @PrimaryGeneratedColumn({ type: 'bigint', name: 'id' })
  id: string;

  @Column('varchar', { name: 'name', nullable: true, length: 100 })
  name: string | null;

  @Column('int', {
    name: 'type',
    nullable: true,
    comment: '轮播位置：0->PC首页轮播；1->app首页轮播',
  })
  type: number | null;

  @Column('varchar', { name: 'pic', nullable: true, length: 500 })
  pic: string | null;

  @Column('datetime', { name: 'start_time', nullable: true })
  startTime: Date | null;

  @Column('datetime', { name: 'end_time', nullable: true })
  endTime: Date | null;

  @Column('int', {
    name: 'status',
    nullable: true,
    comment: '上下线状态：0->下线；1->上线',
  })
  status: number | null;

  @Column('int', { name: 'click_count', nullable: true, comment: '点击数' })
  clickCount: number | null;

  @Column('int', { name: 'order_count', nullable: true, comment: '下单数' })
  orderCount: number | null;

  @Column('varchar', {
    name: 'url',
    nullable: true,
    comment: '链接地址',
    length: 500,
  })
  url: string | null;

  @Column('varchar', {
    name: 'note',
    nullable: true,
    comment: '备注',
    length: 500,
  })
  note: string | null;

  @Column('int', {
    name: 'sort',
    nullable: true,
    comment: '排序',
    default: () => "'0'",
  })
  sort: number | null;
}
