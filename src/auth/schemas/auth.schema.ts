import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

export enum UserRole {
  ADMIN = 'admin',
  USER = 'user',
}

@Schema({
  timestamps: true,
})
export class User {
  @Prop({
    required: true,
    unique: true,
  })
  email: string;

  @Prop({
    required: true,
  })
  first_name: string;

  @Prop({
    required: true,
  })
  last_name: string;

  @Prop({
    required: true,
  })
  password: string;

  @Prop({
    required: true,
  })
  phonenumber: string;

  @Prop({
    required: true,
    default: UserRole.USER,
  })
  role: UserRole;

  @Prop({
    type: {
      ward: String,
      district: String,
      city: String,
    },
    default: null,
  })
  address: {
    ward: string;
    district: string;
    city: string;
  };

  @Prop()
  created_at?: Date;

  @Prop()
  updated_at?: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);
