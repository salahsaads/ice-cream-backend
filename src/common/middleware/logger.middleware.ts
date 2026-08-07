import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction): void {
    const start = Date.now();
    const isMultipart = req.is('multipart/form-data');

    console.log('\n========== REQUEST ==========');
    console.log('Method:', req.method);
    console.log('URL:', req.originalUrl);
    console.log('Headers:', req.headers);
    console.log('Query:', req.query);
    console.log('Params:', req.params);
    if (isMultipart) {
      console.log(
        'Body: [multipart/form-data parsed later by multer interceptor]',
      );
    } else {
      console.log('Body:', req.body);
    }

    const originalJson = res.json;

    res.json = function (body: any) {
      console.log('\n========== RESPONSE ==========');
      console.log('Status:', res.statusCode);
      if (isMultipart) {
        console.log('Parsed Body:', req.body);
      }
      console.log('Body:', body);
      console.log(`Time: ${Date.now() - start} ms`);
      console.log('==============================\n');

      return originalJson.call(this, body);
    };

    next();
  }
}
