import { NestFactory } from '@nestjs/core';
import { UserModule } from './user.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create(UserModule);

  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.GRPC,
    options: {
      package: 'user',
      protoPath: join(process.cwd(), 'proto', 'user.proto'),
      url: '127.0.0.1:1338'
    }
  })

  await app.init();

  await app.startAllMicroservices();
  // await app.listen(process.env.port ?? 1338);
}
bootstrap();
