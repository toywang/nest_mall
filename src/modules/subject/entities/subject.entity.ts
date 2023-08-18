import { BeforeInsert, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('cms_subject', { schema: 'mallshop' })
export class Subject {
  @PrimaryGeneratedColumn({ type: 'bigint', name: 'id' })
  id: string;

  @Column('bigint', { name: 'category_id', nullable: true })
  categoryId: string | null;

  @Column('varchar', { name: 'title', nullable: true, length: 100 })
  title: string | null;

  @Column('varchar', {
    name: 'pic',
    nullable: true,
    comment: '专题主图',
    length: 500,
  })
  pic: string | null;

  @Column('int', {
    name: 'product_count',
    nullable: true,
    comment: '关联产品数量',
  })
  productCount: number | null;

  @Column('int', { name: 'recommend_status', nullable: true })
  recommendStatus: number | null;

  @Column('datetime', { name: 'create_time', nullable: true })
  createTime: Date | null;
  @BeforeInsert()
  createDate() {
    // 更新entity前更新LastUpdatedDate
    this.createTime = new Date();
  }

  @Column('int', { name: 'collect_count', nullable: true })
  collectCount: number | null;

  @Column('int', { name: 'read_count', nullable: true })
  readCount: number | null;

  @Column('int', { name: 'comment_count', nullable: true })
  commentCount: number | null;

  @Column('varchar', {
    name: 'album_pics',
    nullable: true,
    comment: '画册图片用逗号分割',
    length: 1000,
  })
  albumPics: string | null;

  @Column('varchar', { name: 'description', nullable: true, length: 1000 })
  description: string | null;

  @Column('int', {
    name: 'show_status',
    nullable: true,
    comment: '显示状态：0->不显示；1->显示',
  })
  showStatus: number | null;

  @Column('text', { name: 'content', nullable: true })
  content: string | null;

  @Column('int', { name: 'forward_count', nullable: true, comment: '转发数' })
  forwardCount: number | null;

  @Column('varchar', {
    name: 'category_name',
    nullable: true,
    comment: '专题分类名称',
    length: 200,
  })
  categoryName: string | null;
}
