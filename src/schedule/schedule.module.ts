import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { ScheduleController } from './schedule.controller';
import { ScheduleService } from './schedule.service';

@Module({
  controllers: [ScheduleController],
  providers: [ScheduleService, ScheduleModule]
})
export class MyScheduleModule {}
