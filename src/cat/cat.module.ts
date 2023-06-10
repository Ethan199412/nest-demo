import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";

import { CatService } from "./cat.service";
import { CatController } from "./cat.controller";

@Module({
    controllers: [CatController],
    providers: [CatService],
    exports: [CatService]
})
export class CatModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        // consumer.apply(LoggerMiddleware).forRoutes('cat')
    }
}
