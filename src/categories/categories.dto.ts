import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsString, Length } from 'class-validator';

export class CreateCategoryDto {
  @ApiProperty({
    type: String,
  })
  @IsString()
  @Length(1, 50)
  display_name: string;
}

export class UpdateCategoryDto extends CreateCategoryDto {}

export class DeleteCategoryDto {
  @ApiProperty({
    type: String,
  })
  @IsArray()
  ids: string[];
}
