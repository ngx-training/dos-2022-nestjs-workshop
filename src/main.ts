import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService: ConfigService = app.get<ConfigService>(ConfigService);
  const port = configService.get('PORT');
  
  // Hier kommen weitere Konfiguration für die app
  /* 
  Erlaubt die Verwendung von Hooks: 
  onModuleDestroy, beforeApplicationShutdown, onApplicationShutdown
  */
  app.enableShutdownHooks();
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(port);
}
bootstrap();
