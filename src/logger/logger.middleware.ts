import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, res: any, next: () => void) {
    console.log('Request from: ' + req.hostname + ' Ip: ' + req.ip);
    next();
  }
}
