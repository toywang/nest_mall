import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { PrefrenceAreaService } from './prefrence-area.service';
import { CreatePrefrenceAreaDto } from './dto/create-prefrence-area.dto';
import { UpdatePrefrenceAreaDto } from './dto/update-prefrence-area.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('商品优选管理')
@Controller('prefrenceArea')
export class PrefrenceAreaController {
  constructor(private readonly prefrenceAreaService: PrefrenceAreaService) {}

  @Get('listAll')
  findAll() {
    return this.prefrenceAreaService.findAll();
  }
}
