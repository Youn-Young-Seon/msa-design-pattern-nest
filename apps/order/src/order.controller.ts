import { Body, Controller, Get, HttpStatus, Logger, Param, Post } from '@nestjs/common';
import { OrderService } from './order.service';
import { RequestOrder } from './vo/request-order';
import { randomUUID } from 'crypto';
import { OrderEntity } from './domain/order.entity';

@Controller()
export class OrderController {
  private readonly logger = new Logger(OrderController.name);

  constructor(
    private readonly orderService: OrderService
  ) {}

  @Post(':userId/orders')
  async createOrder(@Param('userId') userId: string, @Body() orderDetails: RequestOrder) {
    this.logger.log('Before add orders data');

    const orderDto = orderDetails.toDto();
    orderDto.userId = userId;
    orderDto.orderId = randomUUID.toString();
    orderDto.totalPrice = (orderDto.qty * orderDto.unitPrice);

    const createdOrder = await this.orderService.createOrder(orderDto);

    this.logger.log('After add orders data');
    return {
      code: HttpStatus.CREATED,
      data: createdOrder.toResponse()
    }
  }

  @Get(':userId/orders')
  async getOrder(@Param('userId') userId: string) {
    this.logger.log('Before add orders data');

    const orderList: OrderEntity[] = await this.orderService.getOrdersByUserId(userId);
    const result = orderList.map(orderEntity => orderEntity.toResponse());

    this.logger.log('After add orders data');
    return {
      code: HttpStatus.OK,
      data: result
    }
  }
}
