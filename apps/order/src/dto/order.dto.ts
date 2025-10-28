import { Order } from "../domain/order";

export class OrderDto {
    productId: string;
    qty: number;
    unitPrice: number;
    totalPrice: number;

    orderId: string;
    userId: string;

    toEntity(): Order {
        const order = new Order();
        order.orderId = parseInt(this.orderId);
        order.productId = this.productId;
        order.qty = this.qty;
        order.unitPrice = this.unitPrice;
        order.totalPrice = this.totalPrice;
        order.userId = parseInt(this.userId);
        return order;
    }

    toResponse() {
        const responseOrder = new OrderDto();
        responseOrder.productId = this.productId;
        responseOrder.qty = this.qty;
        responseOrder.unitPrice = this.unitPrice;
        responseOrder.totalPrice = this.totalPrice;
        responseOrder.orderId = this.orderId;
        return responseOrder;
    }
}