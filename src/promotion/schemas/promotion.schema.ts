import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type PromotionDocument = HydratedDocument<Promotion>;

@Schema({
  timestamps: true,
})
export class Promotion {
  @Prop({
    required: true,
    type: String,
  })
  title: string;

  @Prop({
    required: true,
    type: Number,
  })
  value: number;

  @Prop()
  created_at?: Date;

  @Prop()
  updated_at?: Date;
}

export const PromotionSchema = SchemaFactory.createForClass(Promotion);
