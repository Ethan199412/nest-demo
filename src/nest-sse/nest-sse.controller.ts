import { Controller, Get, Req, Res, Sse } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { fromEvent, map, Observable } from 'rxjs';
import { NestSseService } from './nest-sse.service';
import { Response } from 'express';

@Controller('nest-sse')
export class NestSseController {
  constructor(
    private readonly nestSseService: NestSseService,
    private readonly eventEmitter: EventEmitter2,
  ) {}

  @Sse('update_record')
  updateRecord(@Req() req, @Res() res: Response): Observable<MessageEvent> {
    const address = req.socket.remoteAddress;
    const port = req.socket.remotePort;
    this.nestSseService.addClient(`${address}:${port}`, res as any, req);
    return fromEvent(this.eventEmitter, 'sse:record.updated_sse').pipe(
      map((data) => {
        return data as MessageEvent;
      }),
    );
  }

  @Get('sse')
  send() {
    setInterval(() => {
      this.nestSseService.emit({ data: { num: 123 }, module: 'num' });
    }, 1000);
  }

  //   @Get('/subscribe')
  //   subscribe(@Res() res) {
  //     let counter = 0;

  //     // 订阅消息
  //     const subscription = this.eventEmitter.on('message', (message) => {
  //       // 发送消息给前端
  //       res.write(message);

  //       counter++;
  //       if (counter === 10) {
  //         // 关闭连接
  //         res.end();
  //         subscription.off('message');// 取消订阅
  //       }
  //     });

  //     // 发送消息
  //     this.messageService.sendMessages();
  //   }
}
