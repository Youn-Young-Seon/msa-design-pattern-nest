import { Controller, Get, Query, Redirect, Render } from '@nestjs/common';
import { ProductService } from './product.service';
import { Product } from './domain/product';

@Controller()
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get()
  @Redirect("/products")
  home() {
    return;
  }

  @Get('products')
  @Render('product/list')
  async listProducts(
    @Query('category') category: string, 
    @Query('manufacturer') manufacturer: string
  ) {
    let products: Product[];

    if (category && manufacturer) {
      products = await this.productService.getProductsByManufacturerAndCategory(manufacturer, category);
    } else if (category) {
      products = await this.productService.getProductsByCategory(category);
    } else if (manufacturer) {
      products = await this.productService.getProductsByManufacturer(manufacturer);
    } else {
      products = await this.productService.getAllProducts();
    }

    return {
      products,
      category,
      manufacturer,
    }
  }
}
