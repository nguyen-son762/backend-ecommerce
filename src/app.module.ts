import { Module, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { ProductModule } from './product/product.module';
import { CategoriesModule } from './categories/categories.module';
import { AuthMiddleware } from './middlewares/auth.middleware';
import { ConfigModule } from '@nestjs/config';
import { PromotionModule } from './promotion/promotion.module';
import { OrderModule } from './order/order.module';
import { Cloudinary } from './cloudinary/cloudinary/cloudinary';
import { CloudinaryModule } from './cloudinary/cloudinary.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    AuthModule,
    MongooseModule.forRoot(process.env.MONGO_URI),
    ProductModule,
    CategoriesModule,
    PromotionModule,
    OrderModule,
    CloudinaryModule,
  ],
  controllers: [AppController],
  providers: [AppService, Cloudinary],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    // consumer.apply(AuthMiddleware).forRoutes(
    //   {
    //     path: 'categories',
    //     method: RequestMethod.POST,
    //   },
    //   {
    //     path: 'categories/*',
    //     method: RequestMethod.PATCH,
    //   },
    // );
    consumer.apply().forRoutes({ path: 'api/*', method: RequestMethod.ALL });
  }
}
