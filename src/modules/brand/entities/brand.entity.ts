import { ApiProperty } from '@nestjs/swagger';
import { BeforeInsert, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('pms_brand')
export class Brand {
  @ApiProperty({ description: '自增 id' })
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @ApiProperty({ description: '名称' })
  @Column({ length: 64 })
  name: string;

  @ApiProperty({ description: '首字母' })
  @Column({ length: 8 })
  first_letter: string;

  @ApiProperty({ description: '是否为品牌制造商：0->不是；1->是' })
  @Column({ type: 'int' })
  factory_status: number;

  @ApiProperty({ description: '' })
  @Column({ type: 'int' })
  show_status: number;

  @ApiProperty({ description: '产品数量' })
  @Column({ type: 'int' })
  product_count: number;

  @ApiProperty({ description: '产品评论数量' })
  @Column({ type: 'int' })
  product_comment_count: number;

  @ApiProperty({ description: '排序' })
  @Column({})
  sort: number;

  @ApiProperty({ description: '品牌logo' })
  @Column({ type: 'varchar', length: 255 })
  logo: string;

  @ApiProperty({ description: '专区大图' })
  @Column({ type: 'varchar', length: 255 })
  big_pic: string;

  @ApiProperty({ description: '品牌故事' })
  @Column({ type: 'text' })
  brand_story: string;
}
