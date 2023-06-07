import { Global, MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import { LoggerMiddleware } from "src/middleware/loggerMiddleware";
import { CatsService } from "./cat.service";
import { CatsController } from "./cats.controller";

@Global()
@Module({
    controllers: [CatsController],
    providers: [CatsService],
    exports: [CatsService]
})
export class CatsModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        consumer.apply(LoggerMiddleware).forRoutes('cat')
    }
}
