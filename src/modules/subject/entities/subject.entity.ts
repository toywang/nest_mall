import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('cms_subject')
export class Subject {
  @ApiProperty({ description: '自增 id' })
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @ApiProperty({ description: '分类ID' })
  @Column({ name: 'category_id' })
  categoryId: number;

  @ApiProperty({ description: '标题' })
  @Column({ type: 'varchar', length: 100 })
  title: string;

  @ApiProperty({ description: '专题主图' })
  @Column({ type: 'varchar', length: 500 })
  pic: string;

  @ApiProperty({ description: '关联产品数量' })
  @Column({ name: 'product_count' })
  productCount: number;

  @ApiProperty({ description: '' })
  @Column({ name: 'recommend_status', type: 'int' })
  recommendStatus: number;

  @ApiProperty({ description: '' })
  @Column({ name: 'collect_count', type: 'int' })
  collectCount: number;

  @ApiProperty({ description: '' })
  @Column({ name: 'read_count', type: 'int' })
  readCount: number;

  @ApiProperty({ description: '' })
  @Column({ name: 'comment_count', type: 'int' })
  commentCount: number;

  @ApiProperty({ description: '画册图片用逗号分割' })
  @Column({ type: 'varchar', length: 1000, name: 'album_pics' })
  albumPics: string;

  @ApiProperty({ description: '' })
  @Column({ type: 'varchar', length: 1000 })
  description: string;

  @ApiProperty({ description: '显示状态：0->不显示；1->显示' })
  @Column({ name: 'show_status', type: 'int' })
  showStatus: number;

  @ApiProperty({ description: '转发数' })
  @Column({ name: 'forward_count', type: 'int' })
  forwardCount: number;

  @ApiProperty({ description: '' })
  @Column({ type: 'text' })
  content: string;

  @ApiProperty({ description: '专题分类名称' })
  @Column({ name: 'category_name', type: 'varchar', length: 200 })
  categoryName: string;
}
