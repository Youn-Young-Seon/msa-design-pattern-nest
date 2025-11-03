import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { OrderModule } from './order/order.module';
import { UserModule } from './user/user.module';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ORDER_SERVICE_NAME } from '@app/common/grpc/proto/order';
import { OrderMicroservice, UserMicroservice } from '@app/common/grpc/proto';
import { join } from 'path';
import { USER_SERVICE_NAME } from '@app/common/grpc/proto/user';
import { BearerTokenMiddleware } from './middleware/bearer-token.middleware';

@Module({
  imports: [
    ClientsModule.register({
      clients: [
        {
          name: USER_SERVICE_NAME,
          transport: Transport.GRPC,
          options: {
            package: UserMicroservice.protobufPackage,
            protoPath: join(process.cwd(), 'proto', 'user.proto'),
            url: '127.0.0.1:1338'
          }
        },
        {
          name: ORDER_SERVICE_NAME,
          transport: Transport.GRPC,
          options: {
            package: OrderMicroservice.protobufPackage,
            protoPath: join(process.cwd(), 'proto', 'order.proto'),
            url: '127.0.0.1:1337'
          }
        }
      ],
      isGlobal: true
    }),
    OrderModule, UserModule
  ],
  controllers: [],
  providers: [],
})
export class GatewayModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(BearerTokenMiddleware)
      .forRoutes('*');
  }
}
