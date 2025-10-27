import { Column, Entity, OneToMany, PrimaryGeneratedColumn, Table } from "typeorm";
import { OrderItem } from "./order-item";

@Entity('orders')
export class Order {
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    orderDate: Date;
    @Column()
    totalAmount: number;
    @OneToMany(
        () => OrderItem, 
        item => item.order, 
        { cascade: true }
    )
    items: OrderItem[];

    addItem(item: OrderItem) {
        this.items.push(item);
        item.order = this;
    }
}