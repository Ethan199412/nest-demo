import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CatsController } from './controller/cats.controller';
import { PersonEntity } from './entity/person.entity';
import { RolesGuard } from './guard/authGuard';
import { LoggerMiddleware } from './middleWare/loggerMiddleware';
import { PersonModule } from './module/person.module';

@Module({
  imports: [TypeOrmModule.forRoot({
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: '12345678',
    database: 'test',
    entities: [PersonEntity],
    synchronize: true,
  }),
    PersonModule
  ],
  controllers: [AppController, CatsController],
  providers: [AppService,
  ],
})

export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('api/cat')
  }
}
