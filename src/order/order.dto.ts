import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsObject, IsString } from 'class-validator';

export class CreateOrderDto {
  @ApiProperty({
    type: String,
  })
  @IsString()
  @IsNotEmpty()
  product_id: string;

  @ApiProperty({
    type: String,
  })
  @IsString()
  @IsNotEmpty()
  model_id: string;

  @ApiProperty({
    type: String,
  })
  @IsString()
  @IsNotEmpty()
  status: string;

  @ApiProperty({
    type: Number,
  })
  @IsNumber()
  @IsNotEmpty()
  amount: string;

  @ApiProperty({
    type: Object,
    default: {
      ward: 1,
      district: 2,
      city: 3,
    },
  })
  @IsObject()
  @IsNotEmpty()
  address: {
    ward: string;
    district: string;
    city: string;
  };
}

export class UpdateOrderDto {}
