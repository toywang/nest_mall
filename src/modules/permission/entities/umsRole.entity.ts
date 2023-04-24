import { ApiProperty } from '@nestjs/swagger';
import moment from 'moment';
import { BeforeInsert, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('ums_role')
export class UmsRole {
  @ApiProperty({ description: '自增 id' })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ description: '名称' })
  @Column({ length: 100 })
  name: string;

  @ApiProperty({ description: '描述' })
  @Column({ length: 500 })
  description: string;

  @ApiProperty({ description: '后台用户数量' })
  @Column({ length: 500, name: 'admin_count' })
  adminCount: string;

  @ApiProperty({ description: '启用状态：0->禁用；1->启用' })
  @Column()
  status: number;

  @ApiProperty({ description: '排序' })
  @Column()
  sort: number;

  @Column({
    name: 'create_time',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createTime: string;
  @BeforeInsert()
  createDate() {
    // 更新entity前更新LastUpdatedDate
    this.createTime = moment().format('YYYY-MM-DD HH:mm:ss');
  }
}
