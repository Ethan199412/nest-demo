import { Module } from '@nestjs/common';
import { NestSseController } from './nest-sse.controller';
import { NestSseService } from './nest-sse.service';

@Module({
  controllers: [NestSseController],
  providers: [NestSseService],
})
export class NestSseModule {}
