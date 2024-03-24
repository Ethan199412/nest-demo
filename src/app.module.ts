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
  SubmitEntity,
  TypeormDemoEntity,
} from './typeorm-demo/typeorm-demo.entity';
import { SseModule } from './sse/sse.module';
import { StreamController } from './stream/stream.controller';
import { StreamModule } from './stream/stream.module';

@Module({
  // imports: [ScheduleModule.forRoot()],
  controllers: [AppController, StreamController],
  providers: [AppService],
  imports: [
    TypeormDemoModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '123456',
      database: 'test',
      entities: [TypeormDemoEntity, MarketEntity, SubmitEntity],
      synchronize: true,
    }),
    SseModule,
    StreamModule,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('cats');
  }
}
