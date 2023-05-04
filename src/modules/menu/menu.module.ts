import { Module } from '@nestjs/common';
import { MenuService } from './menu.service';
import { MenuController } from './menu.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UmsMenu } from '../permission/entities/umsMenu.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UmsMenu])],
  controllers: [MenuController],
  providers: [MenuService],
})
export class MenuModule {}
