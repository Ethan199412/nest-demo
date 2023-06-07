import { Controller, Get, HttpStatus, Post, Res } from "@nestjs/common";
import { Response } from "express";
import { LoggerMiddleware } from "src/middleware/loggerMiddleware";
import { CatsService } from "./cat.service";

@Controller('cats')
// @Use(LoggerMiddleware)
export class CatsController {
    constructor(private readonly catsService: CatsService){

    }
    @Post()
    create(@Res() res: Response) {
        res.status(HttpStatus.CREATED).send()
    }

    @Get('get-all')
    findAll(@Res() res: Response) {
        res.send(this.catsService.getAll())
    }
}