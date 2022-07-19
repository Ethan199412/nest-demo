import { Controller, Get, HttpStatus, Post, Res } from "@nestjs/common";
import { Response } from "express";

@Controller('cats')
export class CatsController {
    @Post()
    create(@Res() res: Response){
        res.status(HttpStatus.CREATED).send()
    }

    @Get()
    findAll(@Res() res: Response) {
        res.status(HttpStatus.OK).json([])
    }
}