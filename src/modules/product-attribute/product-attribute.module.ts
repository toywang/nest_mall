import { Module } from '@nestjs/common';
import { ProductAttributeService } from './product-attribute.service';
import { ProductAttributeController } from './product-attribute.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductAttribute } from './entities/product-attribute.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ProductAttribute])],
  controllers: [ProductAttributeController],
  providers: [ProductAttributeService],
})
export class ProductAttributeModule {}
