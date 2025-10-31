import { Module } from '@nestjs/common';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderEntity } from './domain/order.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'qhdks00!!',
      database: 'msa_order',
      entities: [OrderEntity],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([
      OrderEntity
    ])
  ],
  controllers: [OrderController],
  providers: [OrderService],
})
export class OrderModule {}
