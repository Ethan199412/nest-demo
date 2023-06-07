import { Injectable, CanActivate, ExecutionContext } from "@nestjs/common";
import { Request } from "express";
import { Observable } from "rxjs";

@Injectable()
export class RolesGuard implements CanActivate {
    canActivate(
        context: ExecutionContext
    ): boolean | Promise<boolean> | Observable<boolean> {
        const request = context.switchToHttp().getRequest<Request>();
        // 读取token
        const authorization = request.header('authorization');
        console.log('[p0.3] authorization', authorization)
        if (!authorization) {
            return false;
        }
        return true
    }
}