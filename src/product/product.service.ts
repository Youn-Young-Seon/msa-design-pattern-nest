import { Injectable, UseInterceptors } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './domain/product';
import { Repository } from 'typeorm';
import { Category } from './domain/category';

@Injectable()
export class ProductService {
    constructor(
        @InjectRepository(Product)
        private readonly productRepo: Repository<Product>,
    ) { }

    async findById(productId: number): Promise<Product> {
        const findOneProduct = await this.productRepo.findOne({
            where: {
                id: productId
            }
        });

        if (!findOneProduct) {
            throw new Error("상품이 존재하지 않습니다.");
        }

        return findOneProduct;
    }

    async getAllProducts(): Promise<Product[]> {
        return await this.productRepo.find();
    }

    async getProductsByManufacturer(manufacturer: string): Promise<Product[]> {
        return await this.productRepo.find({
            where: {
                manufacturer: manufacturer
            }
        });
    }

    async getProductsByCategory(category: string): Promise<Product[]> {
        if (!this.isValidCategory(category)) {
            throw new Error('Invalid category');
        }

        return await this.productRepo.find({
            where: {
                category: category as Category
            }
        });
    }

    async getProductsByManufacturerAndCategory(manufacturer: string, category: string): Promise<Product[]> {
        if (!this.isValidCategory(category)) {
            throw new Error('Invalid category');
        }

        return await this.productRepo.find({
            where: {
                manufacturer,
                category: category as Category
            }
        })
    }

    // @UseInterceptors(TransactionInterceptor)
    async saveAll(products: Product[]): Promise<void> {
        await this.productRepo.save(products);
    }


    private isValidCategory(category: string): boolean {
        return Object.values(Category).includes(category as Category);
    }
}
