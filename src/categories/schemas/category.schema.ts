import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type CategoryDocument = HydratedDocument<Category>;

@Schema({
  timestamps: true,
})
export class Category {
  @Prop({
    required: true,
    unique: true,
  })
  display_name: string;

  @Prop()
  created_at?: Date;

  @Prop()
  updated_at?: Date;
}

export const CategorySchema = SchemaFactory.createForClass(Category);
