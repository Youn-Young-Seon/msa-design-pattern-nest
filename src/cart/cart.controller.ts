import { Controller, Get, ParseIntPipe, Query, Redirect, Render } from '@nestjs/common';
import { OrderService } from 'src/order/order.service';

@Controller('cart')
export class CartController {
  constructor(
    private readonly orderService: OrderService
  ) {}

  @Get()
  @Render('order/cart')
  viewCart() {
    const items = this.orderService.getCartItems();
    return { items };
  }

  @Get('add')
  @Redirect('/cart')
  async addToCart(@Query('productId', ParseIntPipe) productId: number) {
    return await this.orderService.addToCart(productId, 1);    
  }
}
