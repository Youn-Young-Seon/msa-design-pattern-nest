import { Field, ID, Int, ObjectType } from "@nestjs/graphql";
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('orders')
@ObjectType()
export class OrderEntity {
    @Field(() => ID)
    @PrimaryGeneratedColumn()
    id: number;

    @Field(() => ID)
    @Column({ nullable: false, length: 120 })
    productId: string;

    @Field()
    @Column({ nullable: false })
    qty: number;

    @Field(() => Int)
    @Column({ nullable: false })
    unitPrice: number;

    @Field(() => Int)
    @Column({ nullable: false })
    totalPrice: number;

    @Field(() => Int)
    @Column({ nullable: false })
    userId: string;

    @Field()
    @Column({ nullable: false, unique: true })
    orderId: string;

    @Field()
    @Column({ nullable: false, update: false, insert: false })
    @CreateDateColumn()
    createdAt: Date;
}