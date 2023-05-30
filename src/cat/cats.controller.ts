import { BadRequestException, Controller, Get, HttpStatus, InternalServerErrorException, Post, Res } from "@nestjs/common";
import { Response } from "express";

@Controller('cats')
export class CatsController {
    @Post()
    create(@Res() res: Response){
        res.status(HttpStatus.CREATED).send()
    }

    @Get()
    findAll() {
        // throw new InternalServerErrorException('haha')
        throw new BadRequestException('hihi')
    }
}