import mongoose from 'mongoose';
import { Injectable, HttpStatus } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schemas/auth.schema';
import { CreateUserDto, GetUserByEmailDto } from './auth.dto';
import { errorException } from 'src/helpers/error.helper';
import { USER_ERROR_MESSAGES } from './auth.constants';
import { SERVER_MESSAGES } from 'src/constants/http.constants';
import { comparePassword, encodePassword } from 'src/utils/bcrypt';
@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name)
    private userModel: mongoose.Model<User>,
    private readonly jwtService: JwtService,
  ) {}

  async getUserByEmail(params: GetUserByEmailDto) {
    try {
      const { email, password } = params;
      const user = await this.userModel.findOne({ email });
      if (!user) {
        throw errorException(
          HttpStatus.INTERNAL_SERVER_ERROR,
          USER_ERROR_MESSAGES.NOT_FOUND_EMAIL,
        );
      }
      const isMatchPassword = comparePassword(password, user.password);
      if (user && isMatchPassword) {
        const accessToken = await this.generateJwt(user);
        return {
          user,
          accessToken,
        };
      }
      throw errorException(
        HttpStatus.INTERNAL_SERVER_ERROR,
        USER_ERROR_MESSAGES.EMAIL_PASSWORD_WRONG,
      );
    } catch (err) {
      if (err?.keyValue?.email) {
        throw errorException(
          HttpStatus.INTERNAL_SERVER_ERROR,
          USER_ERROR_MESSAGES.EMAIL_DUPLICATE,
        );
      }
      throw errorException(HttpStatus.INTERNAL_SERVER_ERROR, err);
    }
  }

  async create(params: CreateUserDto) {
    try {
      const hashPassword = encodePassword(params.password);
      const user = await this.userModel.create({
        ...params,
        password: hashPassword,
      });
      if (!user) {
        throw errorException(
          HttpStatus.INTERNAL_SERVER_ERROR,
          SERVER_MESSAGES.ERROR,
        );
      }
      const accessToken = await this.generateJwt(user);
      return {
        user,
        accessToken,
      };
    } catch (err) {
      if (err?.keyValue?.email) {
        throw errorException(
          HttpStatus.INTERNAL_SERVER_ERROR,
          'Email is duplicate',
        );
      }
      throw errorException(HttpStatus.INTERNAL_SERVER_ERROR, err);
    }
  }

  async generateJwt(user: User): Promise<string> {
    return this.jwtService.signAsync({ user });
  }

  verifyJwt(jwt: string): Promise<any> {
    return this.jwtService.verifyAsync(jwt);
  }
}
