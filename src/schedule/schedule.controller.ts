import { Controller, Get } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';

@Controller('schedule')
export class ScheduleController {
    @Get('task')
    task(){
        return 'task start'
    }

    // @Cron('5 * * * *')
    // printHelloWorld1() {
    //   console.log('Hello World 1');
    // }

}
