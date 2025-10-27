import { Injectable, Logger, OnModuleInit } from "@nestjs/common";
import { Category } from "src/product/domain/category";
import { Product } from "src/product/domain/product";
import { ProductService } from "src/product/product.service";

@Injectable()
export class DataLoader implements OnModuleInit {
    private readonly logger = new Logger(DataLoader.name);

    constructor(private readonly productService: ProductService) { }

    async onModuleInit() {
        await this.loadProducts();

        this.logger.log(`Sample data loaded successfully.`);
    }

    async loadProducts() {
        if ((await this.productService.getAllProducts()).length > 0) {
            return;
        }

        const products: Product[] = [
            new Product(
                "자바 머그컴",
                Category.KITCHEN,
                "JavaKitchen",
                15000,  // BigDecimal 대신 number 사용
                50,
            ),
            new Product(
                "데이터베이스 교재",
                Category.BOOKS,
                "TechBooks",
                30000,
                500,
            ),
            new Product(
                "노트북",
                Category.ELECTRONICS,
                "TechCompany",
                1200000,
                30,
            ),
            new Product(
                "캐주얼 데님 자켓",
                Category.CLOTHING,
                "FashionBrand",
                89000,
                150,
            ),
            new Product(
                "런닝화 Air Max",
                Category.SPORTS,
                "SportyWear",
                129000,
                100,
            ),
            new Product(
                "비즈니스 캐주얼 셔츠",
                Category.CLOTHING,
                "FashionBrand",
                59000,
                200,
            ),
            new Product(
                "헤드폰 NoiseCancel Pro",
                Category.ELECTRONICS,
                "SoundMaster",
                299000,
                80,
            ),
            new Product(
                "프리미엄 쇼파",
                Category.HOME,
                "FitLife",
                1990000,
                120,
            ),
            new Product(
                "홈 오피스 책상",
                Category.HOME,
                "HomeStyle",
                249000,
                40,
            ),
            new Product(
                "아로마 디퓨저",
                Category.HOME,
                "HomeLiving",
                39000,
                100,
            ),
            new Product(
                "베스트셀러 소설",
                Category.BOOKS,
                "BookHouse",
                15000,
                300,
            ),
        ]

        await this.productService.saveAll(products);
        this.logger.log(`Loaded products: ${products.length}`);
    }
}