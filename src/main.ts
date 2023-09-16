import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
// import { HttpExceptionFilter } from './filter/httpExceptionFilter';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger'

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  (app as any).useStaticAssets('public'); 
  // app.useGlobalFilters(new HttpExceptionFilter())
  app.enableCors()
  const options = new DocumentBuilder().addBearerAuth().setTitle('小满的飞机').setDescription('很小').setVersion('1').build()
  const document = SwaggerModule.createDocument(app, options)

  SwaggerModule.setup('/api-docs', app, document)
  await app.listen(3010);

}
bootstrap();
