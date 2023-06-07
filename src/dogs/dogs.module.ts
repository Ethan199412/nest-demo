import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import { DogsService } from "./dogs.service";
import { DogsController } from "./dogs.controller";
import { CatsService } from "src/cats/cat.service";
import { CatsModule } from "src/cats/cats.module";

@Module({
    controllers: [DogsController],
    providers: [DogsService],
    // imports: [CatsModule]
})
export class DogsModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        // consumer.apply(LoggerMiddleware).forRoutes('cat')
    }
}
