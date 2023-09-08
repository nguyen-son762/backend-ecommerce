import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schemas/auth.schema';
import { RegisterUserParams } from './types/auth.type';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name)
    private userModel: mongoose.Model<User>,
    private readonly jwtService: JwtService,
  ) {}

  async findOneByEmail(email: string, password: string) {
    const users = await this.userModel.findOne({ email });
    return 'This action adds a new auth ';
  }

  async create(params: RegisterUserParams): Promise<User> {
    const user = await this.userModel.create(params);
    return user;
  }

  async generateJwt(user: User): Promise<string> {
    return this.jwtService.signAsync({ user });
  }

  async hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, 12);
  }

  async comparePasswords(
    password: string,
    storedPasswordHash: string,
  ): Promise<any> {
    return bcrypt.compare(password, storedPasswordHash);
  }

  verifyJwt(jwt: string): Promise<any> {
    return this.jwtService.verifyAsync(jwt);
  }
}
