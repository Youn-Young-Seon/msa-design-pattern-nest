import { OrderEntity } from "../domain/order.entity";
import { ResponseOrder } from "../vo/response-order";

export class OrderDto {
    productId: string;
    qty: number;
    unitPrice: number;
    totalPrice: number;
    orderId: string;
    userId: string;

    toEntity() {
        const order = new OrderEntity();
        order.productId = this.productId;
        order.qty = this.qty;
        order.unitPrice = this.unitPrice;
        order.totalPrice = this.totalPrice;
        order.orderId = this.orderId;
        order.userId = this.userId;
        return order;
    }

    toResponse() {
        const responseOrder = new ResponseOrder();
        responseOrder.productId = this.productId;
        responseOrder.qty = this.qty;
        responseOrder.unitPrice = this.unitPrice;
        responseOrder.totalPrice = this.totalPrice;
        responseOrder.orderId = this.orderId;
        responseOrder.createdAt = new Date(Date.now());
        return responseOrder;
    }
}