import { Controller, Get, Redirect, Render } from '@nestjs/common';
import { OrderService } from './order.service';

@Controller()
export class OrderController {
  constructor(private readonly orderService: OrderService) { }

  @Get("order/checkout")
  @Redirect(`/orders`)
  async checkoutOrder() {
    try {
      return await this.orderService.placeOrder();
    } catch (error) {
      return {
        "errorMessage": error.message
      }
    }
  }

  @Get("orders")
  @Render("order/list")
  async listOrders() {
    return await this.orderService.getAllOrders();
  }
}
