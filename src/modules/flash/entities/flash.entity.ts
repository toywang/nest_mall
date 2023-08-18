import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('sms_flash_promotion', { schema: 'mallshop' })
export class Flash {
  @PrimaryGeneratedColumn({ type: 'bigint', name: 'id' })
  id: string;

  @Column('varchar', {
    name: 'title',
    nullable: true,
    comment: '秒杀时间段名称',
    length: 200,
  })
  title: string | null;

  @Column('date', { name: 'start_date', nullable: true, comment: '开始日期' })
  startDate: string | null;

  @Column('date', { name: 'end_date', nullable: true, comment: '结束日期' })
  endDate: string | null;

  @Column('int', { name: 'status', nullable: true, comment: '上下线状态' })
  status: number | null;

  @Column('datetime', {
    name: 'create_time',
    nullable: true,
    comment: '创建时间',
  })
  createTime: Date | null;
}
