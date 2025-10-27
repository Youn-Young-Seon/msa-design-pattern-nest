import { BaseEntity } from "src/common/domain/base-entity";
import { Category } from "./category";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { OrderItem } from "src/order/domain/order-item";

@Entity('products')
export class Product extends BaseEntity {
    @PrimaryGeneratedColumn()
    private id: number;
    @Column()
    private name: string;
    private category: Category;
    @Column()
    private manufacturer: string;
    @Column()
    private price: number;
    @Column()
    private stock: number;
    @Column()
    private imageUrl?: string;
    @OneToMany(
        () => OrderItem,
        item => item.product
    )
    items: OrderItem[];

    constructor(name: string, category: Category, manufacturer: string, price: number, stock: number, imageUrl: string) {
        super();
        this.name = name;
        this.category = category;
        this.manufacturer = manufacturer;
        this.price = price;
        this.stock = stock;
        this.imageUrl = imageUrl
    }
}