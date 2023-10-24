import { Injectable } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { Response } from 'express';

export enum SseActionEnum {
  CREATE = 'create',
  UPDATE = 'update',
}

export class EmitSSEData {
  @IsString()
  @IsNotEmpty()
  module: string;

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
    this.eventEmitter.emit('sse:record.updated_sse', data);
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
}
