import { ApiProperty } from '@nestjs/swagger';
import { ProductAttributeCategory } from '@src/modules/product-attribute-category/entities/product-attribute-category.entity';
import { ProductCategory } from '@src/modules/product-category/entities/product-category.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('pms_product_attribute')
export class ProductAttribute {
  @ApiProperty({ description: '自增 id' })
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @ApiProperty({ description: '' })
  @Column({ type: 'bigint', name: 'product_attribute_category_id' })
  productAttributeCategoryId: number;

  @ApiProperty({ description: '' })
  @Column({ type: 'varchar', length: 64 })
  name: string;

  @ApiProperty({ description: '属性选择类型：0->唯一；1->单选；2->多选' })
  @Column({ type: 'int', name: 'select_type' })
  selectType: number;

  @ApiProperty({ description: '属性录入方式：0->手工录入；1->从列表中选取' })
  @Column({ type: 'int', name: 'input_type' })
  inputType: number;

  @ApiProperty({ description: '可选值列表，以逗号隔开' })
  @Column({ type: 'varchar', name: 'input_list', length: 255 })
  inputList: string;

  @ApiProperty({ description: '排序字段：最高的可以单独上传图片' })
  @Column({ type: 'int' })
  sort: number;

  @ApiProperty({ description: '分类筛选样式：1->普通；1->颜色' })
  @Column({ type: 'int', name: 'filter_type' })
  filterType: number;

  @ApiProperty({
    description: '检索类型；0->不需要进行检索；1->关键字检索；2->范围检索',
  })
  @Column({ type: 'int', name: 'search_type' })
  searchType: number;

  @ApiProperty({ description: '相同属性产品是否关联；0->不关联；1->关联' })
  @Column({ type: 'int', name: 'related_status' })
  relatedStatus: number;

  @ApiProperty({ description: '是否支持手动新增；0->不支持；1->支持' })
  @Column({ type: 'int', name: 'hand_add_status' })
  handAddStatus: number;

  @ApiProperty({ description: '属性的类型；0->规格；1->参数' })
  @Column({ type: 'int' })
  type: number;

  @ManyToOne(
    (type) => ProductAttributeCategory,
    (productAttributeCategory) => productAttributeCategory.productAttributeList,
  )
  @JoinColumn({ name: 'product_attribute_category_id' })
  productAttributeCategory: ProductAttributeCategory;
}
