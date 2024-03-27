import { Controller, Get, HttpStatus, Post, Res, UseInterceptors } from "@nestjs/common";
import { Response } from "express";
import { CatService } from "src/cat/cat.service";
import { LoggingInterceptor } from "src/interceptor/loggingInterceptor";
import { LoggerMiddleware } from "src/middleware/loggerMiddleware";
import { DogService } from "./dog.service";

@Controller('dog')
@UseInterceptors(LoggingInterceptor)
export class DogsController {
    constructor(private readonly dogService: DogService, private readonly catService: CatService) {

    }
    @Post()
    create(@Res() res: Response) {
        res.status(HttpStatus.CREATED).send()
    }

    // 使用拦截器的时候，return 可以拿到数据，但是 send 拿不着
    @Get('get-all')
    findAll() {
        return this.dogService.getAll()
    }

    @Get('get-all-cats')
    findAllCats() {
        // return this.catService.getAll()
    }
}