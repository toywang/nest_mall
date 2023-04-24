import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsString, IsNotEmpty, IsNumber } from 'class-validator';

export class UpdateRoleDto {
  @ApiProperty({ type: Number })
  @Type(() => Number)
  @IsNotEmpty({ message: 'adminid不能为空' })
  @IsNumber()
  adminId: number;

  @ApiProperty({ type: Array })
  @IsNotEmpty({ message: 'roleIds不能为空' })
  @IsString()
  roleIds: string;
}
