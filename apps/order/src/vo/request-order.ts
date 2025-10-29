import { OrderDto } from "../dto/order.dto";

export class RequestOrder {
    productId: string;
    qty: number;
    unitPrice: number;

    toDto() {
        const orderDto = new OrderDto();
        orderDto.productId = this.productId;
        orderDto.qty = this.qty;
        orderDto.unitPrice = this.unitPrice;
        return orderDto;
    }
}