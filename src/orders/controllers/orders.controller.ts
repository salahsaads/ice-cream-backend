import {
  BadRequestException,
  Body,
  Controller,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import type { Request } from 'express';
import { OrderDto } from '../dto/orders.dto';
import { LoginGuard } from 'src/common/guards/login.guard';
import { OrdersService } from '../service/orders.service';
import { isValidObjectId } from 'mongoose';

interface RequestWithUser extends Request {
  user?: {
    sub?: string;
    id?: string;
    _id?: string;
  };
}

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @UseGuards(LoginGuard)
  @Post('create')
  async createOrder(@Body() orderDto: OrderDto, @Req() req: RequestWithUser) {
    if (!orderDto) {
      throw new Error('Order data is required');
    }

    const tokenUser = req.user;
    const tokenUserId = tokenUser?.sub || tokenUser?.id || tokenUser?._id;

    if (!tokenUserId) {
      throw new BadRequestException('User ID is required in token');
    }

    if (!isValidObjectId(tokenUserId)) {
      throw new BadRequestException('Token user id is not a valid ObjectId');
    }

    const orderData = {
      ...orderDto,
      userId: tokenUserId,
    };

    return this.ordersService.create(orderData);
  }
}
