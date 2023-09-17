import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsNotEmpty,
  IsNotEmptyObject,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { Type } from 'class-transformer';
import { Transform } from 'class-transformer';
import { toNumber } from 'src/utils/transform';

export class CreateProductDto {
  @ApiProperty({
    type: String,
  })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({
    type: String,
  })
  @IsString()
  @IsNotEmpty()
  image: string;

  @ApiProperty({
    type: String,
  })
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty({
    type: Array,
  })
  @IsArray()
  @IsNotEmpty()
  categories: string[];

  @ApiProperty({
    type: Array,
    example: [
      {
        name: 'test',
        options: ['option1'],
        images: ['images'],
      },
    ],
  })
  @IsArray()
  tier_variations: {
    name: string;
    options: string[];
    images: string[];
  }[];

  @ApiProperty({
    type: Array,
  })
  @IsArray()
  @IsNotEmpty()
  product_images: string[];

  @ApiProperty({
    type: Object,
    example: {
      rating_star: 0,
      rating_count: [0],
      total_rating_count: 0,
    },
  })
  @IsNotEmptyObject()
  @Type(() => ProductReview)
  product_review: {
    rating_star: number;
    rating_count: number[];
    total_rating_count: number;
  };

  @ApiProperty({
    type: String,
    default: null,
  })
  @IsString()
  @IsOptional()
  promotion_id: string;

  @ApiProperty({
    type: Array,
    example: [
      {
        name: 'model name',
        price: 1000,
        sold: 10,
      },
    ],
  })
  @IsArray()
  models: {
    name: number;
    price: number[];
    sold: number;
  }[];
}

export class ProductReview {
  @ApiProperty({
    type: Number,
  })
  @IsNumber()
  rating_star: number;

  @ApiProperty({
    type: Object,
  })
  @IsArray()
  rating_count: number[];

  @ApiProperty({
    type: Number,
  })
  @IsNumber()
  total_rating_count: number;
}

export class FindByPaginationParams {
  @ApiProperty({
    type: String,
  })
  @IsString()
  @IsOptional()
  keyword: string;

  @ApiProperty({
    type: Number,
    default: 1,
  })
  @Transform(({ value }) => toNumber(value, { default: 1, min: 1 }))
  @IsNumber()
  page: number;

  @ApiProperty({
    type: Number,
    default: 10,
    required: false,
  })
  @Transform(({ value }) => toNumber(value, { default: 10, min: 2 }))
  @IsNumber()
  limit: number;

  @ApiProperty({
    type: String,
    enum: ['asc', 'desc'],
    default: 'asc',
    required: false,
  })
  @IsOptional()
  @IsString()
  sort_by: string;

  @ApiProperty({
    type: String,
    enum: ['title', 'price'],
    default: 'title',
    required: false,
  })
  @IsOptional()
  @IsString()
  sort_value: string;
}
