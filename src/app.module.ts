import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CatModule } from './cat/cat.module';
import { DogModule } from './dog/dog.module';
import { LoggerMiddleware } from './middleware/loggerMiddleware';
// import { MyScheduleModule } from './schedule/schedule.module';
import { TypeormDemoModule } from './typeorm-demo/typeorm-demo.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
  MarketEntity,
  TypeormDemoEntity,
} from './typeorm-demo/typeorm-demo.entity';
import { SseModule } from './sse/sse.module';
import { NestSseModule } from './nest-sse/nest-sse.module';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { ModuleRef } from '@nestjs/core';

@Module({
  // imports: [ScheduleModule.forRoot()],
  controllers: [AppController],
  providers: [AppService],
  imports: [
    EventEmitterModule.forRoot(),
    // TypeormDemoModule,
    // TypeOrmModule.forRoot({
    //   type: 'mysql',
    //   host: 'localhost',
    //   port: 3306,
    //   username: 'root',
    //   password: '123456',
    //   database: 'test',
    //   entities: [TypeormDemoEntity, MarketEntity],
    //   synchronize: true,
    // }),
    SseModule,
    NestSseModule,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('cats');
  }
}
