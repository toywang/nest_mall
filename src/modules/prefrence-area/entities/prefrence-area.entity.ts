import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('cms_prefrence_area')
export class PrefrenceArea {
  @ApiProperty({ description: '自增 id' })
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @ApiProperty({ description: '' })
  @Column({ type: 'int' })
  sort: number;

  @ApiProperty({ description: '标题' })
  @Column({ type: 'varchar', length: 255 })
  name: string;

  @ApiProperty({ description: '' })
  @Column({ type: 'int', name: 'show_status' })
  showStatus: number;

  @ApiProperty({ description: '标题' })
  @Column({ type: 'varchar', length: 255, name: 'sub_title' })
  subTitle: string;

  @ApiProperty({ description: '标题' })
  @Column({ type: 'varbinary', length: 500 })
  pic: string;
}
