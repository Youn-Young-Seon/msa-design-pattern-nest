import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Order } from './domain/order';
import { InjectRepository } from '@nestjs/typeorm';
import { OrderDto } from './dto/order.dto';
import { randomUUID } from 'crypto';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
  ) { }

  async createOrder(orderDto: OrderDto) {
    orderDto.orderId = randomUUID();
    orderDto.totalPrice = orderDto.qty * orderDto.unitPrice;

    const order: Order = orderDto.toEntity();
    this.orderRepository.save(order);

    const returnValue = order.toDto();

    return returnValue;
  }

  async getOrderByOrderId(orderId: string) {
    const order = await this.orderRepository.findOneBy({
      orderId: parseInt(orderId)
    });

    return order?.toDto();
  }

  async getOrdersByUserId(userId: string) {
    return await this.orderRepository.findBy({
      userId: parseInt(userId)
    });
  }
}
