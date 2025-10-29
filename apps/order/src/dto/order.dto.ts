import { OrderEntity } from "../domain/order.entity";
import { ResponseOrder } from "../vo/response-order";

export class OrderDto {
    productId: string;
    qty: number;
    unitPrice: number;
    totalPrice: number;
    orderId: string;
    userId: string;
}