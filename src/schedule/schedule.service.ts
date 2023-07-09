import { Injectable } from '@nestjs/common';
import { Cron, Interval, Timeout } from '@nestjs/schedule';

@Injectable()
export class ScheduleService {
    @Cron('45 * * * * *')
    handleCron() {
      console.log('Called when the second is 45');
    }
  
    @Interval(10000)
    handleInterval() {
      console.log('Called every 10 seconds');
    }
  
    @Timeout(5000)
    handleTimeout() {
      console.log('Called once after 5 seconds');
    }
}
