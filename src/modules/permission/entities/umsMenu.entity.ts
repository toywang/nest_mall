import { ApiProperty } from '@nestjs/swagger';
import moment from 'moment';
import { BeforeInsert, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('ums_menu')
export class UmsMenu {
  @ApiProperty({ description: '自增 id' })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ description: '父级ID' })
  @Column({
    name: 'parent_id',
  })
  parentId: number;

  @ApiProperty({ description: '菜单名称' })
  @Column({ length: 100 })
  title: string;

  @ApiProperty({ description: '菜单级数' })
  @Column()
  level: number;

  @ApiProperty({ description: '菜单排序' })
  @Column()
  sort: number;

  @ApiProperty({ description: '前端名称' })
  @Column({
    length: 100,
  })
  name: string;

  @ApiProperty({ description: '前端图标' })
  @Column({
    length: 200,
  })
  icon: string;

  @ApiProperty({ description: '前端隐藏' })
  @Column()
  hidden: number;

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
