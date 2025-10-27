import { Module } from '@nestjs/common';
import { CartModule } from './cart/cart.module';
import { OrderModule } from './order/order.module';
import { ProductModule } from './product/product.module';
import { CommonModule } from './common/common.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from './order/domain/order';
import { OrderItem } from './order/domain/order-item';
import { Product } from './product/domain/product';
import { BaseEntity } from './common/domain/base-entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      database: 'design',
      username: 'postgres',
      password: 'qhdks00!!',
      host: 'localhost',
      port: 5432,
      entities: [Order, OrderItem, Product, BaseEntity],
      synchronize: true,
    }),
    CartModule,
    CommonModule, 
    OrderModule, 
    ProductModule
  ]
})
export class AppModule { }
