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
  @Column({ length: 8, name: 'first_letter' })
  firstLetter: string;

  @ApiProperty({ description: '是否为品牌制造商：0->不是；1->是' })
  @Column({ type: 'int', name: 'factory_status' })
  factoryStatus: number;

  @ApiProperty({ description: '' })
  @Column({ type: 'int', name: 'show_status' })
  showStatus: number;

  @ApiProperty({ description: '产品数量' })
  @Column({ type: 'int', name: 'product_count' })
  productCount: number;

  @ApiProperty({ description: '产品评论数量' })
  @Column({ type: 'int', name: 'product_comment_count' })
  productCommentCount: number;

  @ApiProperty({ description: '排序' })
  @Column({})
  sort: number;

  @ApiProperty({ description: '品牌logo' })
  @Column({ type: 'varchar', length: 255 })
  logo: string;

  @ApiProperty({ description: '专区大图' })
  @Column({ type: 'varchar', length: 255, name: 'big_pic' })
  bigPic: string;

  @ApiProperty({ description: '品牌故事' })
  @Column({ type: 'text', name: 'brand_story' })
  brandStory: string;
}
