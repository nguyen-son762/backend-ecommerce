import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types, Schema as MongooseSchema } from 'mongoose';
import {
  Category,
} from 'src/categories/schemas/category.schema';
import { Promotion } from 'src/promotion/schemas/promotion.schema';

export type ProductDocument = HydratedDocument<Product>;

@Schema({
  timestamps: true,
})
export class Product {
  @Prop({
    type: String,
  })
  title: string;

  @Prop({
    type: String,
  })
  image: string;

  @Prop({
    type: Number,
  })
  price: number;

  @Prop({
    required: false,
    default: [],
    type: [Types.ObjectId],
    ref: Category.name,
  })
  categories: Category[];

  @Prop()
  description: string;

  @Prop({
    type: Array,
  })
  tier_variations: {
    name: string;
    options: string[];
    images: string[];
  }[];

  @Prop()
  product_images: string[];

  @Prop({
    type: {
      rating_star: Number,
      rating_count: Array,
      total_rating_count: Number,
    },
    _id: false,
  })
  product_review: {
    rating_star: number;
    rating_count: number[];
    total_rating_count: number;
  };

  @Prop({
    type: [
      {
        name: String,
        price: Number,
        sold: Number,
      },
    ],
  })
  models: {
    name: number;
    price: number[];
    sold: number;
  }[];

  @Prop({
    type: MongooseSchema.Types.ObjectId,
    ref: Promotion.name,
    default: null,
  })
  promotion_id: Promotion;

  @Prop()
  created_at?: Date;

  @Prop()
  updated_at?: Date;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
