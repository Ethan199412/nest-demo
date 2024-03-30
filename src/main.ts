import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
// import { HttpExceptionFilter } from './filter/httpExceptionFilter';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { INestApplication } from '@nestjs/common';
import { join } from 'path';

async function bootstrap() {
  const app: INestApplication = await NestFactory.create(AppModule);
  (app as any).useStaticAssets(join(__dirname, '..', 'public'), {
    prefix: '/public/', //设置虚拟路径
  });

  // app.useGlobalFilters(new HttpExceptionFilter())
  app.enableCors();
  app.setGlobalPrefix('api/v1')
  
  const options = new DocumentBuilder()
    .addBearerAuth()
    .setTitle('小满的飞机')
    .setDescription('很小')
    .setVersion('1')
    .build();
  const document = SwaggerModule.createDocument(app as any, options);

  SwaggerModule.setup('/api-docs', app as any, document);
  await app.listen(3010);
}
bootstrap();
