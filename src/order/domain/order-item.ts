import { Product } from "src/product/domain/product";
import { Order } from "./order";

export class OrderItem {
    private id: number;
    order: Order;
    private product: Product;
    private quantity: number;
    private price: number;
  
    constructor(product: Product, quantity: number, price: number) {
        this.product = product;
        this.quantity = quantity;
        this.price = price;
    }
}