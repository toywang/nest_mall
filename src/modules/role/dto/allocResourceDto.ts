import { ApiProperty } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class AllocResourceDto {
  @ApiProperty({ type: Number })
  @Type(() => Number)
  @IsNotEmpty({ message: 'roleId不能为空' })
  @IsNumber()
  roleId: number;

  @ApiProperty({ type: String, description: '逗号分割的字符串' })
  @IsNotEmpty({ message: 'resourceIds不能为空' })
  @IsString()
  resourceIds: string;
}
