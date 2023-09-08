import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterUserParams } from './types/auth.type';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/login')
  login(@Body() email: string, @Body() password: string) {
    return this.authService.findOneByEmail(email, password);
  }

  @Post('/sign-up')
  signup(@Body() user: RegisterUserParams) {
    return this.authService.create(user);
  }
}
