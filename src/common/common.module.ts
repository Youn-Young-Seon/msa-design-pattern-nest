import { Module } from '@nestjs/common';
import { CommonService } from './common.service';
import { CommonController } from './common.controller';
import { ProductModule } from 'src/product/product.module';
import { DataLoader } from './infrastructure/data-loader';

@Module({
  imports: [ProductModule],
  controllers: [CommonController],
  providers: [
    CommonService,
    DataLoader,
  ],
})
export class CommonModule { }
