import { Body, Controller, Get, HttpStatus, Logger, Param, Post } from '@nestjs/common';
import { OrderService } from './order.service';
import { RequestOrder } from './vo/request-order';
import { OrderDto } from './dto/order.dto';
import { randomUUID } from 'crypto';

@Controller()
export class OrderController {
  private readonly logger = new Logger(OrderController.name);

  constructor(private readonly orderService: OrderService) { }

  @Get('health-check')
  status(): string {
    return 'order service is healthy';
  }

  @Post(':userId/orders')
  async createOrder(@Param('userId') userId: string, @Body() orderDetails: RequestOrder) {
    this.logger.log(`Before add orders data`);

    const orderDto: OrderDto = orderDetails.toDto();
    orderDto.userId = userId;
    orderDto.orderId = randomUUID();
    orderDto.totalPrice = orderDetails.qty * orderDetails.unitPrice;

    const createdOrder: OrderDto = await this.orderService.createOrder(orderDto);
    const responseOrder = createdOrder.toResponse();

    this.logger.log(`After added orders data`);
    return {
      code: HttpStatus.CREATED,
      message: 'success',
      data: responseOrder
    }
  }
}
