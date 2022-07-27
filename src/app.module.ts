import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CatsController } from './controller/cats.controller';
import { RolesGuard } from './guard/authGuard';
import { LoggerMiddleware } from './middleWare/loggerMiddleware';

@Module({
  imports: [],
  controllers: [AppController, CatsController],
  providers: [AppService,
    {
      provide: APP_GUARD,
      useClass: RolesGuard
    }
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('api/cat')
  }
}
