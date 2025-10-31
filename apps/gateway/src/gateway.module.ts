import { Module } from '@nestjs/common';
import { OrderModule } from './order/order.module';
import { UserModule } from './user/user.module';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ORDER_SERVICE_NAME } from '@app/common/grpc/proto/order';
import { OrderMicroservice } from '@app/common/grpc/proto';
import { join } from 'path';
import { url } from 'inspector';

@Module({
  imports: [
    ClientsModule.register({
      clients: [
        {
          name: ORDER_SERVICE_NAME,
          transport: Transport.GRPC,
          options: {
            package: OrderMicroservice.protobufPackage,
            protoPath: join(process.cwd(), 'proto', 'order.proto'),
            url: '127.0.0.1:1337'
          }
        }
      ]
    }),
    OrderModule, UserModule
  ],
  controllers: [],
  providers: [],
})
export class GatewayModule {}
