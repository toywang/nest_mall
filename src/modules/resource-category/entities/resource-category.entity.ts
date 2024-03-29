import { ApiProperty } from '@nestjs/swagger';
import { BeforeInsert, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('ums_resource_category')
export class ResourceCategory {
  @ApiProperty({ description: '自增 id' })
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @ApiProperty({ description: '名称' })
  @Column({ length: 200 })
  name: string;

  @ApiProperty({ description: '排序' })
  @Column({})
  sort: number;

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
