import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { OrderEntity } from './domain/order.entity';
import { Repository } from 'typeorm';
import { OrderDto } from './dto/order.dto';
import { randomUUID } from 'crypto';
import { plainToClass } from 'class-transformer';

@Injectable()
export class OrderService {
  private readonly logger = new Logger(OrderService.name);

  constructor(
    @InjectRepository(OrderEntity)
    private readonly orderRepository: Repository<OrderEntity>
  ) { }

  async createOrder(orderDto: OrderDto) {
    orderDto.orderId = randomUUID().toString();
    orderDto.totalPrice = (orderDto.qty * orderDto.unitPrice);

    const orderEntity = plainToClass(OrderEntity, orderDto);
    this.logger.log(`orderEntity: ${JSON.stringify(orderEntity)}`);
    await this.orderRepository.save(orderEntity);

    return plainToClass(OrderDto, orderEntity);
  }

  async getOrderByOrderId(orderId: string) {
    const orderEntity = await this.orderRepository.findOneBy({ orderId });
    
    if (!orderEntity) {
      throw new Error('Order not found');
    }
    
    return plainToClass(OrderDto, orderEntity);
  }

  async getOrdersByUserId(userId: string) {
    return await this.orderRepository.findBy({ userId });
  }

}
