import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './filter/httpExceptionFilter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // app.useGlobalFilters(new HttpExceptionFilter())
  app.enableCors()
  await app.listen(3010);

}
bootstrap();
