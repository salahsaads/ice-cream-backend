import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { DatabaseModule } from './database/database.module';
import { ConfigModule } from '@nestjs/config';
import { jwtModule } from './common/jwt/jwt.module';
import { ProductModule } from './product/product.module';
import { LoggerMiddleware } from './common/middleware/logger.middleware';
import { OrdersModule } from './orders/orders.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    jwtModule,

    DatabaseModule,
    UsersModule,
    ProductModule,
    OrdersModule,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
    .forRoutes('*');
  }
}
