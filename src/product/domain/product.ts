import { BaseEntity } from "src/common/domain/base-entity";
import { Category } from "./category";

export class Product extends BaseEntity {
    private id: number;
    private name: string;
    private category: Category;
    private manufacturer: string;
    private price: number;
    private stock: number;
    private imageUrl?: string;

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