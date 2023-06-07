import { Injectable, Logger, NestMiddleware } from "@nestjs/common";
import { Request } from "express";

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
    use(req: Request, res: Response, next: Function) {
        Logger.error('[p1.0] middleware called')
        next()
    }
}