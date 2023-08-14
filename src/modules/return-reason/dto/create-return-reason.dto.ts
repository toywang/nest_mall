import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsEmpty, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateReturnReasonDto {
  @ApiProperty({ description: '退货类型' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ type: Number, description: '' })
  @Type(() => Number)
  @IsNotEmpty({ message: 'sort不能为空' })
  @IsNumber()
  sort: number;

  @ApiProperty({ description: '' })
  @Type(() => Number)
  @IsNotEmpty({ message: 'status不能为空' })
  @IsNumber()
  status: number;
}
