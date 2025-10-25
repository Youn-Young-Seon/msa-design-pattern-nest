import { Injectable } from '@nestjs/common';

@Injectable()
export class OrderService {
  addToCart(productId: number, p0: number) {
    throw new Error('Method not implemented.');
  }
  getCartItems() {
    throw new Error('Method not implemented.');
  }
}
