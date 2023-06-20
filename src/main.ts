import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
// import { HttpExceptionFilter } from './filter/httpExceptionFilter';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger'

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors()

  // app.useGlobalFilters(new HttpExceptionFilter())
  const options = new DocumentBuilder().setTitle('xiaoT的飞机').setDescription('xxx').setVersion('1').build()
  const doc = SwaggerModule.createDocument(app, options)
  await app.listen(3010);

}
bootstrap();
