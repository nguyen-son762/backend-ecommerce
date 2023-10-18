import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { Product } from 'src/product/schemas/product.schema';

export type PromotionDocument = HydratedDocument<Order>;

export enum OrderStatusEnums {
  ORDERED = 'ordered',
  CONFIRM = 'confirm',
  SHIPPING = 'shipping',
  COMPLETED = 'completed',
}

@Schema({
  timestamps: true,
})
export class Order {
  @Prop({
    required: true,
    default: [],
    type: Types.ObjectId,
    ref: Product.name,
  })
  product: Product;

  @Prop({
    required: true,
    type: String,
  })
  model_id: string;

  @Prop({
    required: true,
    type: Number,
  })
  amount: number;

  @Prop({
    required: true,
    type: String,
  })
  status: OrderStatusEnums;

  @Prop({
    _id: false,
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

export const OrderSchema = SchemaFactory.createForClass(Order);
