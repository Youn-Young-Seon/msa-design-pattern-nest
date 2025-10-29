import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { OrderDto } from "../dto/order.dto";
import { ResponseOrder } from "../vo/response-order";

@Entity('orders')
export class OrderEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: false, length: 120 })
    productId: string;

    @Column({ nullable: false })
    qty: number;

    @Column({ nullable: false })
    unitPrice: number;

    @Column({ nullable: false })
    totalPrice: number;

     @Column({ nullable: false })
     userId: string;

     @Column({ nullable: false, unique: true })
     orderId: string;

     @Column({ nullable: false, update: false, insert: false })
     createdAt: Date;

     toDto() {
        const orderDto = new OrderDto();
        orderDto.productId = this.productId;
        orderDto.qty = this.qty;
        orderDto.unitPrice = this.unitPrice;
        orderDto.totalPrice = this.totalPrice;
        orderDto.userId = this.userId;
        orderDto.orderId = this.orderId;
        return orderDto;
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