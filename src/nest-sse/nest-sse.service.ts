import { Injectable } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { Response } from 'express';
import { fromEvent, map } from 'rxjs';

export enum SseActionEnum {
  CREATE = 'create',
  UPDATE = 'update',
}

export class EmitSSEData {
  // @IsString()
  // @IsNotEmpty()
  // module: string;

  @IsEnum(SseActionEnum)
  @IsOptional()
  action?: SseActionEnum;

  data: {
    [key: string]: any;
  };
}

@Injectable()
export class NestSseService {
  constructor(private readonly eventEmitter: EventEmitter2) {}
  private clients = new Map<string, Response>();

  emit(data: EmitSSEData) {
    this.eventEmitter.emit('push_data', data);
  }

  subscribe(clientId: string, res: Response, req: any) {
    this.addClient(clientId, res, req);
    return fromEvent(this.eventEmitter, 'push_data').pipe(
      map((data) => {
        return data as MessageEvent;
      }),
    );
  }

  addClient(clientId: string, res: Response, req: any) {
    console.log('[p1.0] clientId', clientId);
    if (this.clients.get(clientId)) {
      return;
    }
    this.clients.set(clientId, res);
    req.connection.on(
      'close',
      () => {
        if (this.clients.get(clientId)) {
          this.clients.delete(clientId);
        }
      },
      false,
    );
  }

  sendToClient(clientId: string, data: any) {
    const client = this.clients.get(clientId);
    if (client) {
      client.write(`data: ${JSON.stringify(data)}\n\n`);
    }
  }

  pushData() {
    return new Promise<MessageEvent>((resolve) => {
      this.eventEmitter.addListener('push_data', (event: MessageEvent) => {
        resolve(event);
      });
    });
  }
}
