import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Product } from './product.entity';

@Entity('pms_product_full_reduction')
export class ProductFullReduction {
  @ApiProperty({ description: '自增 id' })
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @ApiProperty({ description: '' })
  @Column({ type: 'bigint', name: 'product_id' })
  productId: number;

  @ApiProperty({ description: '' })
  @Column({ type: 'decimal', name: 'full_price' })
  fullPrice: number;

  @ApiProperty({ description: '' })
  @Column({ type: 'decimal', name: 'reduce_price' })
  reducePrice: number;

  @ManyToOne((type) => Product, (product) => product.productFullReduction)
  @JoinColumn({ name: 'product_id' })
  product: Product;
}
