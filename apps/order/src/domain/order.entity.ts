import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";

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
     @CreateDateColumn()
     createdAt: Date;
}