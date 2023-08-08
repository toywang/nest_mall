import { Controller, Get, Query } from '@nestjs/common';
import { MemberLevelService } from './member-level.service';

@Controller('memberLevel')
export class MemberLevelController {
  constructor(private readonly memberLevelService: MemberLevelService) {}

  @Get('list')
  findAll(@Query('defaultStatus') defaultStatus: number) {
    return this.memberLevelService.findAll(defaultStatus);
  }
}
