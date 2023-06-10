import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import { DogService } from "./dog.service";
import { DogsController } from "./dog.controller";
import { CatService } from "src/cat/cat.service";
import { CatModule } from "src/cat/cat.module";

@Module({
    controllers: [DogsController],
    providers: [DogService],
    imports: [CatModule]
})
export class DogModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        // consumer.apply(LoggerMiddleware).forRoutes('cat')
    }
}
