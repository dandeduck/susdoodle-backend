import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { configService } from './config/config.service';

const fs = require('fs');

async function bootstrap() {
  const httpsOptions = {
    key: fs.readFileSync('./cert/key.pem'),
    cert: fs.readFileSync('./cert/cert.pem'),
  };
  const app = await NestFactory.create(AppModule, {cors: true}); 
  app.setGlobalPrefix('v1');
  await app.listen(configService.getPort());
}
bootstrap();
