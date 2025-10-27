import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './domain/product';
import { TransactionInterceptor } from 'src/common/interceptor/transaction.interceptor';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Product
    ]),
  ],
  controllers: [ProductController],
  providers: [
    ProductService,
    // {
    //   provide: 'APP_INTERCEPTOR',
    //   useClass: TransactionInterceptor,
    // }
  ],
  exports: [ProductService],
})
export class ProductModule {}
