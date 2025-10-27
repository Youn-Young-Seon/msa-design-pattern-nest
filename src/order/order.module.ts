import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from './domain/order';
import { OrderItem } from './domain/order-item';
import { FakePaymentService } from './fake-payment.service';
import { ProductModule } from 'src/product/product.module';
import { PaymentService } from './payment.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Order,
      OrderItem,
    ]),
    ProductModule,    
  ],
  controllers: [OrderController],
  providers: [
    OrderService,
    {
      provide: PaymentService,
      useClass: FakePaymentService,
    }
  ],
  exports: [OrderService],
})
export class OrderModule {}
