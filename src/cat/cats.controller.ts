import { BadRequestException, Controller, Get, HttpStatus, InternalServerErrorException, ParseIntPipe, Post, Query, Res } from "@nestjs/common";
import { Response } from "express";

@Controller('cat')
export class CatsController {
    @Post()
    create(@Res() res: Response) {
        res.status(HttpStatus.CREATED).send()
    }

    @Get()
    findAll() {
        // throw new InternalServerErrorException('haha')
        throw new BadRequestException('hihi')
    }

    // 管道的使用
    @Get('test')
    test(@Query('number', new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE })) number: string) {
        console.log('[p1.0] number', number)
        return {
            number
        }
    }
}