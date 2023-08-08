import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Product } from './product.entity';

@Entity('pms_product_ladder')
export class ProductLadder {
  @ApiProperty({ description: '自增 id' })
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @ApiProperty({ description: '' })
  @Column({ type: 'bigint', name: 'product_id' })
  productId: number;

  @ApiProperty({ description: '满足的商品数量' })
  @Column({ type: 'int' })
  count: number;

  @ApiProperty({ description: '折扣' })
  @Column({ type: 'decimal' })
  discount: number;

  @ApiProperty({ description: '折后价格' })
  @Column({ type: 'decimal' })
  price: number;

  @ManyToOne((type) => Product, (product) => product.productLadderList)
  @JoinColumn({ name: 'product_id' })
  product: Product;
}
