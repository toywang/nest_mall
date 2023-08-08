import { ApiProperty } from '@nestjs/swagger';
import { Product } from '@src/modules/product/entities/product.entity';
import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('pms_product_category')
export class ProductCategory {
  @ApiProperty({ description: '自增 id' })
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @ApiProperty({ description: '上机分类的编号：0表示一级分类' })
  @Column({ type: 'bigint', name: 'parent_id' })
  parentId: number;

  @ApiProperty({ description: '' })
  @Column({ type: 'varchar' })
  name: string;

  @ApiProperty({ description: '分类级别：0->1级；1->2级' })
  @Column({ type: 'int' })
  level: number;

  @ApiProperty({ description: '' })
  @Column({ type: 'int', name: 'product_count' })
  productCount: number;

  @ApiProperty({ description: '' })
  @Column({ type: 'varchar', length: 64, name: 'product_unit' })
  productUnit: string;

  @ApiProperty({ description: '是否显示在导航栏：0->不显示；1->显示' })
  @Column({ type: 'int', name: 'nav_status' })
  navStatus: number;

  @ApiProperty({ description: '显示状态：0->不显示；1->显示' })
  @Column({ type: 'int', name: 'show_status' })
  showStatus: number;

  @ApiProperty({ description: '' })
  @Column({ type: 'int' })
  sort: number;

  @ApiProperty({ description: '图标' })
  @Column({ type: 'varchar', length: 255 })
  icon: string;

  @ApiProperty({ description: '' })
  @Column({ type: 'varchar', length: 255 })
  keywords: string;

  @ApiProperty({ description: '描述' })
  @Column({ type: 'text' })
  description: string;

  @OneToOne((type) => Product, (product) => product.productCategory)
  product: Product;
}
