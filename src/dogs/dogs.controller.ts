import { Controller, Get, HttpStatus, Post, Res } from "@nestjs/common";
import { Response } from "express";
import { CatsService } from "src/cats/cat.service";
import { LoggerMiddleware } from "src/middleware/loggerMiddleware";
import { DogsService } from "./dogs.service";

@Controller('dogs')
// @Use(LoggerMiddleware)
export class DogsController {
    constructor(private readonly dogsService: DogsService, private readonly catsService: CatsService){

    }
    @Post()
    create(@Res() res: Response) {
        res.status(HttpStatus.CREATED).send()
    }

    @Get('get-all')
    findAll(@Res() res: Response) {
        res.send(this.dogsService.getAll())
    }

    @Get('get-all-cats')
    findAllCats(){
        return this.catsService.getAll()
    }
}