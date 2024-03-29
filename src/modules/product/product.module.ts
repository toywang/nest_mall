import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { Product } from './entities/product.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductLadder } from './entities/product-ladder.entity';
import { MemberPrice } from './entities/member-price.entity';
import { ProductAttributeValue } from './entities/product-attribute-value.entity';
import { ProductFullReduction } from './entities/product-full-reduction.entity';
import { SkuStock } from './entities/sku-stock.entity';
import { PrefrenceAreaProductRelation } from './entities/prefrence-area-product-relation.entity';
import { SubjectProductRelation } from './entities/subject-product-relation.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Product,
      ProductLadder,
      MemberPrice,
      ProductAttributeValue,
      ProductFullReduction,
      SkuStock,
      PrefrenceAreaProductRelation,
      SubjectProductRelation,
    ]),
  ],

  controllers: [ProductController],
  providers: [ProductService],
})
export class ProductModule {}
