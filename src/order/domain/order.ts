import { OrderItem } from "./order-item";

export class Order {
    id: number;
    orderDate: Date;
    totalAmount: number;
    items: OrderItem[];

    addItem(item: OrderItem) {
        this.items.push(item);
        item.order = this;
    }
}