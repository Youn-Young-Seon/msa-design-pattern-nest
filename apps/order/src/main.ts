import { NestFactory } from '@nestjs/core';
import { OrderModule } from './order.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create(OrderModule);

  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.GRPC,
    options: {
      package: 'order',
      protoPath: join(process.cwd(), 'apps', 'proto', 'order.proto'),
      url: '127.0.0.1:1337',
    }
  });

  await app.init();

  await app.startAllMicroservices();
  // await app.listen(process.env.port ?? 1337);
}
bootstrap();
