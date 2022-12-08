import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // Hier kommen weitere Konfiguration für die app
  await app.listen(3000);
}
bootstrap();
