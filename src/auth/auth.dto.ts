import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, Length, Matches } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({
    type: String,
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    type: String,
  })
  @IsString()
  @Length(3, 15)
  first_name: string;

  @ApiProperty({
    type: String,
  })
  @IsString()
  @Length(3, 15)
  last_name: string;

  @ApiProperty({
    type: String,
  })
  @IsString()
  @Matches(/(84|0[3|5|7|8|9])+([0-9]{8})\b/, {
    message: 'Phonenumber is invalid',
  })
  phonenumber: string;

  @ApiProperty({
    type: String,
  })
  @IsString()
  @Length(3, 15)
  password: string;
}

export class GetUserByEmailDto {
  @ApiProperty({
    type: String,
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    type: String,
  })
  @IsString()
  @Length(3, 15)
  password: string;
}
