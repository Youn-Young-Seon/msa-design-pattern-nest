import { Product } from "src/product/domain/product";
import { Order } from "./order";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('orderitems')
export class OrderItem {
    @PrimaryGeneratedColumn()
    id: number;
    @ManyToOne(() => Order, order => order.items)
    @JoinColumn({ name: 'order_id' })
    order: Order;
    @ManyToOne(() => Product, product => product.items)
    @JoinColumn({ name: 'product_id' })
    product: Product;
    @Column()
    quantity: number;
    @Column()
    price: number;
  
    constructor(product: Product, quantity: number, price: number) {
        this.product = product;
        this.quantity = quantity;
        this.price = price;
    }
}