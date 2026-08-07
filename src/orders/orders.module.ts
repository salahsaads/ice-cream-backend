import { Module } from '@nestjs/common';
import { ordersProviders } from './providers/orders.providers';
import { DatabaseModule } from 'src/database/database.module';
import { OrdersService } from './service/orders.service';
import { OrdersController } from './controllers/orders.controller';

@Module({
  imports: [DatabaseModule],
  controllers: [OrdersController],
  providers: [...ordersProviders, OrdersService],
})
export class OrdersModule {}
