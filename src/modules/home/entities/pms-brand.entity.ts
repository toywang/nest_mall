import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('pms_brand', { schema: 'mallshop' })
export class PmsBrand {
  @PrimaryGeneratedColumn({ type: 'bigint', name: 'id' })
  id: string;

  @Column('varchar', { name: 'name', nullable: true, length: 64 })
  name: string | null;

  @Column('varchar', {
    name: 'first_letter',
    nullable: true,
    comment: '首字母',
    length: 8,
  })
  firstLetter: string | null;

  @Column('int', { name: 'sort', nullable: true })
  sort: number | null;

  @Column('int', {
    name: 'factory_status',
    nullable: true,
    comment: '是否为品牌制造商：0->不是；1->是',
  })
  factoryStatus: number | null;

  @Column('int', { name: 'show_status', nullable: true })
  showStatus: number | null;

  @Column('int', { name: 'product_count', nullable: true, comment: '产品数量' })
  productCount: number | null;

  @Column('int', {
    name: 'product_comment_count',
    nullable: true,
    comment: '产品评论数量',
  })
  productCommentCount: number | null;

  @Column('varchar', {
    name: 'logo',
    nullable: true,
    comment: '品牌logo',
    length: 255,
  })
  logo: string | null;

  @Column('varchar', {
    name: 'big_pic',
    nullable: true,
    comment: '专区大图',
    length: 255,
  })
  bigPic: string | null;

  @Column('text', { name: 'brand_story', nullable: true, comment: '品牌故事' })
  brandStory: string | null;
}
