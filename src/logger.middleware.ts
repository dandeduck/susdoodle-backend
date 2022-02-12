import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  private start = Date.now();

  use(req: Request, res: Response, next: NextFunction) {
    console.log((Date.now() - this.start) * 0.001, req.method, req.url);
    next();
  }
}