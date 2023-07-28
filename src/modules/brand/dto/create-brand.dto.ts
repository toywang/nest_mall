import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateBrandDto {
  @ApiProperty({ type: String, description: '品牌名称' })
  @IsString()
  @IsNotEmpty({ message: '品牌名称不能为空' })
  name: string;

  @ApiProperty({ type: String })
  @IsString()
  @IsNotEmpty({ message: '品牌logo不能为空' })
  logo: string;

  @ApiProperty({ type: String })
  @IsString()
  bigPic: string;

  @ApiProperty({ type: String })
  @IsString()
  brandStory: string;

  @ApiProperty({ type: String })
  @IsString()
  firstLetter: string;

  @ApiProperty({ type: Number })
  @IsNumber()
  factoryStatus: number;

  @ApiProperty({ type: Number })
  @IsNumber()
  showStatus: number;

  @ApiProperty({ type: Number })
  @IsNumber()
  sort: number;
}
