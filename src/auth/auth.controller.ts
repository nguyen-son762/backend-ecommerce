import { Controller, Post, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto, GetUserByEmailDto } from './auth.dto';
import { ApiBody, ApiTags } from '@nestjs/swagger';

@Controller('auth')
@ApiTags('Auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @ApiBody({
    type: GetUserByEmailDto,
    description: 'Login user',
  })
  @Post('/login')
  login(@Body() user: GetUserByEmailDto) {
    return this.authService.getUserByEmail(user);
  }

  @HttpCode(HttpStatus.OK)
  @ApiBody({
    type: CreateUserDto,
    description: 'Sign up user',
  })
  @Post('/sign-up')
  signup(@Body() user: CreateUserDto) {
    return this.authService.create(user);
  }
}
