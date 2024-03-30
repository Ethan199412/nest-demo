import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Logger,
  Param,
  ParseIntPipe,
  Post,
  Query,
  UseFilters,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AppService } from './app.service';
import { HttpExceptionFilter } from './filter/httpExceptionFilter';
import { RolesGuard } from './guard/authGuard';
import { LoggingInterceptor } from './interceptor/loggingInterceptor';
import { Type } from './myDecorator/myDecorator';

// @UseGuards(RolesGuard)
@UseInterceptors(LoggingInterceptor)
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  // @Get()
  // getHello(): string {
  //   return this.appService.getHello();
  // }

  // @UseFilters(HttpExceptionFilter)
  @Get('api/cat')
  @UseGuards(RolesGuard)
  getCat(
    @Query(
      'number',
      new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
    )
    number: number,
    @Type() type: string,
  ): string {
    // throw new HttpException({
    //   status: 403,
    //   error: 'haha'
    // }, HttpStatus.FORBIDDEN)

    Logger.error('[p0.1] params', { number, type });
    return JSON.stringify({
      number: 5,
      type: '金渐层',
    });
  }

  @UseGuards(RolesGuard)
  @Post('api/updateCat')
  postCat(@Body() body): string {
    Logger.error('[p0.1] body', body);
    return JSON.stringify({
      code: 200,
      msg: '成功',
    });
  }

  @Get('test')
  async test(){
    return 'success'
  }
}
