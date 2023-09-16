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

        this.clients.push(res);

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
            client.write(`data: ${message}\n\n`);
        });
    }

    @Get('notify')
    notify() {
        this.sendSseMessage('Job completed');
        return 'Notification sent';
    }
}
