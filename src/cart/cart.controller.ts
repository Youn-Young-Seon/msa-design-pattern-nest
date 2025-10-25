import { Controller, Get, Query, Render } from '@nestjs/common';
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
  @Render('redirect:/cart')
  addToCart(@Query() productId: number) {
    this.orderService.addToCart(productId, 1);    
  }
}
