import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Product } from './product.entity';

@Entity('pms_sku_stock')
export class SkuStock {
  @ApiProperty({ description: '自增 id' })
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @ApiProperty({ description: '' })
  @Column({ type: 'bigint', name: 'product_id' })
  productId: number;

  @ApiProperty({ description: 'sku编码' })
  @Column({ type: 'varchar', name: 'sku_code', length: 255 })
  skuCode: string;

  @ApiProperty({ description: '' })
  @Column({ type: 'decimal' })
  price: number;

  @ApiProperty({ description: '库存' })
  @Column({ type: 'int' })
  stock: number;

  @ApiProperty({ description: '预警库存' })
  @Column({ type: 'int', name: 'low_stock' })
  lowStock: number;

  @ApiProperty({ description: '展示图片' })
  @Column({ type: 'varchar', length: 255 })
  pic: string;

  @ApiProperty({ description: '销量' })
  @Column({ type: 'int' })
  sale: number;

  @ApiProperty({ description: '单品促销价格' })
  @Column({ type: 'decimal', name: 'promotion_price' })
  promotionPrice: number;

  @ApiProperty({ description: '锁定库存' })
  @Column({ type: 'int', name: 'lock_stock' })
  lockStock: number;

  @ApiProperty({ description: '商品销售属性，json格式' })
  @Column({ type: 'varchar', name: 'sp_data', length: 500 })
  spData: string;

  @ManyToOne((type) => Product, (product) => product.skuStockList)
  @JoinColumn({ name: 'product_id' })
  product: Product;
}
