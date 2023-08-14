import { ApiProperty } from '@nestjs/swagger';
import { BeforeInsert, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('oms_order_return_reason')
export class ReturnReason {
  @ApiProperty({ description: '自增 id' })
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @ApiProperty({ description: '退货类型' })
  @Column({ type: 'varchar' })
  name: string;

  @ApiProperty({ description: '' })
  @Column({ type: 'int' })
  sort: number;

  @ApiProperty({ description: '' })
  @Column({ type: 'int' })
  status: number;

  @Column({
    name: 'create_time',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createTime: Date;
  @BeforeInsert()
  createDate() {
    // 更新entity前更新LastUpdatedDate
    this.createTime = new Date();
  }
}
