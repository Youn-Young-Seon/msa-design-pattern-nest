import { NestFactory } from '@nestjs/core';
import { UserModule } from './user.module';

async function bootstrap() {
  const app = await NestFactory.create(UserModule);  

  await app.init();

  await app.listen(process.env.port ?? 1338);
}
bootstrap();
