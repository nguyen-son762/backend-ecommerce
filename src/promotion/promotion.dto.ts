import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class CreatePromotionDto {
  @ApiProperty({
    type: String,
  })
  @IsString()
  title: string;

  @ApiProperty({
    type: Number,
  })
  @IsNumber()
  value: number;
}

export class UpdatePromotionDto {}
