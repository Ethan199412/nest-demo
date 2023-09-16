import { Controller, Get, Req, Res } from '@nestjs/common';
import { Server } from 'http';
import { Request, Response } from 'express';

@Controller('sse')
export class SseController {

    private clients: Response[] = [];

    @Get('sse')
    sse(@Req() req: Request, @Res() res: Response) {
        res.setHeader('Content-Type', 'text/event-stream');
        res.setHeader('Cache-Control', 'no-cache');
        res.setHeader('Connection', 'keep-alive');
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.flushHeaders();

        // 被订阅了则记录返回对象
        this.clients.push(res);

        // 关闭的时候取消对应的 client
        req.on('close', () => {
            const index = this.clients.indexOf(res);
            if (index !== -1) {
                this.clients.splice(index, 1);
            }
        });
    }

    sendSseMessage(message: string) {
        console.log('[p1.0] length', this.clients.length)
        this.clients.forEach(client => {
            // 发送消息
            const obj = {
                a: 1
            }
            // client.write(`data: ${message}\n\n`); // JSON.stringify(obj)
            // 这个 data 前缀和 \n\n 后缀必须加，否则前端收不到。
            client.write(`data: ${JSON.stringify(obj)}\n\n`)
        });
    }

    @Get('notify')
    notify() {
        this.sendSseMessage('Job completed');
        return 'Notification sent';
    }
}
