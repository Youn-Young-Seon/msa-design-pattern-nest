import { Module } from '@nestjs/common';
import { CartModule } from './cart/cart.module';
import { OrderModule } from './order/order.module';
import { ProductModule } from './product/product.module';
import { CommonModule } from './common/common.module';

@Module({
  imports: [CartModule, CommonModule, OrderModule, ProductModule]
})
export class AppModule {}
