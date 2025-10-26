import { Injectable } from '@nestjs/common';

@Injectable()
export class OrderService {
  addToCart(productId: number, p0: number) {
    throw new Error('Method not implemented.');
  }
  getCartItems() {
    return [
      {
        product: {
          name: "아이템"
        },
        quantity: 12,
        price: 1000,
      },
    ]
  }
}
