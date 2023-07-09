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
import { MarketEntity, TypeormDemoEntity } from './typeorm-demo/typeorm-demo.entity';

@Module({
  // imports: [ScheduleModule.forRoot()],
  controllers: [AppController],
  providers: [AppService],
  imports: [TypeormDemoModule, TypeOrmModule.forRoot({
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: '123456',
    database: 'test',
    entities: [TypeormDemoEntity, MarketEntity],
    synchronize: true,
  })],
})

export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('cats');
  }
}
