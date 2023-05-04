import { ApiProperty } from '@nestjs/swagger';
import { BeforeInsert, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('ums_resource')
export class Resource {
  @ApiProperty({ description: '自增 id' })
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @ApiProperty({ description: '名称' })
  @Column({ length: 200 })
  name: string;

  @ApiProperty({ description: '资源分类ID' })
  @Column({
    type: 'bigint',
    name: 'category_id',
  })
  categoryId: number;

  @ApiProperty({ description: '描述' })
  @Column({ length: 500 })
  description: string;

  @ApiProperty({ description: '资源URL' })
  @Column({ length: 200 })
  url: string;

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
