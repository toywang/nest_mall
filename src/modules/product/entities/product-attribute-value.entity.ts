import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Product } from './product.entity';

@Entity('pms_product_attribute_value')
export class ProductAttributeValue {
  @ApiProperty({ description: '自增 id' })
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @ApiProperty({ description: '' })
  @Column({ type: 'bigint', name: 'product_id' })
  productId: number;

  @ApiProperty({ description: '' })
  @Column({ type: 'bigint', name: 'product_attribute_id' })
  productAttributeId: number;

  @ApiProperty({
    description: '手动添加规格或参数的值，参数单值，规格有多个时以逗号隔开',
  })
  @Column({ type: 'varchar', length: 64 })
  value: string;

  @ManyToOne((type) => Product, (product) => product.attributeValue)
  @JoinColumn({ name: 'product_id' })
  product: Product;
}
