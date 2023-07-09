import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CatModule } from './cat/cat.module';
import { DogModule } from './dog/dog.module';
import { LoggerMiddleware } from './middleware/loggerMiddleware';
// import { MyScheduleModule } from './schedule/schedule.module';

@Module({
  // imports: [ScheduleModule.forRoot()],
  controllers: [AppController],
  providers: [AppService],
})

export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('cats');
  }
}
