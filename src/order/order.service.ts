import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from './domain/order';
import { ProductService } from 'src/product/product.service';
import { PaymentService } from './payment.service';
import { OrderItem } from './domain/order-item';

@Injectable()
export class OrderService {
  private cartItems: OrderItem[] = [];

  constructor(
    @InjectRepository(Order)
    private readonly orderRepo: Repository<Order>,
    private readonly productService: ProductService,
    private readonly paymentService: PaymentService,
  ) { }

  async addToCart(productId: number, quantity: number) {
    const product = await this.productService.findById(productId);

    if (quantity < 1) {
      quantity = 1;
    }

    if (product['stock'] < quantity) {
      throw new Error("재고 부족: 요청 수량이 재고를 초과했습니다.");
    }

    const item: OrderItem = new OrderItem(product, quantity, product['price']);
    this.cartItems.push(item);
  }

  getCartItems() {
    return this.cartItems;
  }

  clearCart() {
    this.cartItems = [];
  }

  async placeOrder(): Promise<Order> {
    if (this.cartItems.length === 0) {
      throw new Error("장바구니가 비어 있습니다.");
    }

    const order = new Order();
    order.orderDate = new Date(Date.now());
    const total = this.cartItems
      .map(item => item.price * item.quantity)
      .reduce((a, b) => a + b, 0);
    order.totalAmount = total;

    const paymentResult: boolean = this.paymentService.processPayment(order);
    if (!paymentResult) {
      throw new Error("결제 실패: 주문을 완료할 수 없습니다.");
    }

    const savedOrder = await this.orderRepo.save(order);
    this.clearCart();
    return savedOrder;
  }

  async getAllOrders(): Promise<Order[]> {
    return await this.orderRepo.find();
  }
}
