import { Module } from '@nestjs/common';
import { CartController } from './cart.controller';
import { OrderModule } from 'src/order/order.module';

@Module({
  imports: [OrderModule],
  controllers: [CartController],
})
export class CartModule {}
