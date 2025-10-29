import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { OrderEntity } from './domain/order.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { OrderDto } from './dto/order.dto';
import { randomUUID } from 'crypto';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(OrderEntity)
    private readonly orderRepository: Repository<OrderEntity>
  ) { }

  async createOrder(orderDto: OrderDto) {
    orderDto.orderId = randomUUID.toString();
    orderDto.totalPrice = (orderDto.qty * orderDto.unitPrice);

    const orderEntity = orderDto.toEntity();
    await this.orderRepository.save(orderEntity);

    return orderEntity.toDto();
  }

  async getOrderByOrderId(orderId: string) {
    const orderEntity = await this.orderRepository.findOneBy({ orderId });
    
    if (!orderEntity) {
      throw new Error('Order not found');
    }
    
    return orderEntity.toDto();
  }

  async getOrdersByUserId(userId: string) {
    return await this.orderRepository.findBy({ userId });
  }
}
