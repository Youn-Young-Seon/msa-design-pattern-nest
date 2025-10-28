import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { OrderDto } from "../dto/order.dto";
import { ResponseOrder } from "../vo/response-order";
import { Field, ID, Int, ObjectType } from "@nestjs/graphql";

@Entity('orders')
@ObjectType()
export class Order {
    @Field(() => ID)
    @PrimaryGeneratedColumn()
    orderId: number;

    @Field(() => ID)
    @Column()
    userId: number;

    @Field()
    @Column()
    productId: string;

    @Field(() => Int)
    @Column()
    qty: number;

    @Field(() => Int)
    @Column()
    unitPrice: number;

    @Field(() => Int)
    @Column()
    totalPrice: number;

    @Field()
    @Column({
        nullable: false, update: false, insert: false,
        default: () => 'CURRENT_TIMESTAMP'
    })
    createdAt: Date;

    toDto(): OrderDto {
        const orderDto = new OrderDto();
        orderDto.orderId = this.orderId.toString();
        orderDto.productId = this.productId.toString();
        orderDto.qty = this.qty;
        orderDto.unitPrice = this.unitPrice;
        orderDto.totalPrice = this.totalPrice;
        orderDto.userId = this.userId.toString();
        return orderDto;
    }

    toResponse(): ResponseOrder {
        const responseOrder = new ResponseOrder();
        responseOrder.productId = this.productId.toString();
        responseOrder.qty = this.qty;
        responseOrder.unitPrice = this.unitPrice;
        responseOrder.totalPrice = this.totalPrice;
        responseOrder.orderId = this.orderId.toString();
        responseOrder.createdAt = this.createdAt;
        return responseOrder;
    }
}