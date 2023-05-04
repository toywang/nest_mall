import { ApiProperty } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class RoleInfoDto {
  @ApiProperty({ type: Number })
  @Type(() => Number)
  @IsNumber()
  adminCount: number;

  @ApiProperty({ type: String, description: 'description' })
  @IsNotEmpty({ message: 'description不能为空' })
  @IsString()
  description: string;

  @ApiProperty({ type: String, description: 'description' })
  @IsNotEmpty({ message: 'name不能为空' })
  @IsString()
  name: string;

  @ApiProperty({ type: Number, description: 'status:1启用 0禁用' })
  @IsNotEmpty({ message: 'status不能为空' })
  @IsNumber()
  status: number;
}
