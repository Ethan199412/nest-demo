import { Controller, Get, Query, Req, Res, Sse } from '@nestjs/common';
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

  @Sse('subscribe')
  async subscribe(@Req() req, @Res() res: Response) {
    const address = req.socket.remoteAddress;
    const port = req.socket.remotePort;
    return this.nestSseService.subscribe(`${address}:${port}`, res, req);
  }

  @Get('sse')
  send() {
    this.nestSseService.emit({ data: { num: 123 } });
  }

  @Get('send_to_client')
  sendToClient(@Query() query) {
    const { client_id } = query;
    this.nestSseService.sendToClient(client_id, { data: 'test' });
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
