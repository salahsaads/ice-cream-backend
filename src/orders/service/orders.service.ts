import { Inject, Injectable } from '@nestjs/common';
import { Order } from '../interfaces/orders.interfaces';
import { Model } from 'mongoose';
import { OrderDto } from '../dto/orders.dto';

@Injectable()
export class OrdersService {
    constructor(
      @Inject('ORDERS_MODEL')
      private readonly ordersModel: Model<Order>,
    ) {}


    async create(order: OrderDto): Promise<Order> {
        const createdOrder = new this.ordersModel(order);
        return createdOrder.save();
    }

}
