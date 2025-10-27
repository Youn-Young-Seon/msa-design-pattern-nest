import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { GlobalExceptionHandler } from './common/exception/global-exception-handler';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.useGlobalFilters(new GlobalExceptionHandler());

  app.setBaseViewsDir('views');
  app.setViewEngine('hbs');

  await app.listen(process.env.PORT ?? 1337);
}
bootstrap();
