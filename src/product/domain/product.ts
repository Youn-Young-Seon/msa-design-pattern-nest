import { BaseEntity } from "src/common/domain/base-entity";
import { Category } from "./category";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { OrderItem } from "src/order/domain/order-item";

@Entity('products')
export class Product extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    name: string;
    @Column({
        type: "enum",
        enum: Category,
    })
    category: Category;
    @Column()
    manufacturer: string;
    @Column()
    price: number;
    @Column()
    stock: number;
    @Column({
        nullable: true,
    })
    imageUrl?: string;
    @OneToMany(
        () => OrderItem,
        item => item.product
    )
    items: OrderItem[];

    constructor(name: string, category: Category, manufacturer: string, price: number, stock: number, imageUrl?: string) {
        super();
        this.name = name;
        this.category = category;
        this.manufacturer = manufacturer;
        this.price = price;
        this.stock = stock;
        this.imageUrl = imageUrl
    }
}