import { MiddlewareConsumer, Module, OnApplicationShutdown, OnModuleInit } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CatsController } from './cats/cats.controller';
import { CatsService } from './cats/cats.service';
import configuration from './config/configuration';
import { LoggerMiddleware } from './logger/logger.middleware';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration]
    }),
  ],
  controllers: [AppController, CatsController],
  providers: [AppService, CatsService],
})
export class AppModule implements OnModuleInit, OnApplicationShutdown {
  onModuleInit(): void {
    console.log('Application start on port: ' + process.env.PORT);
  }

  onApplicationShutdown(signal?: string) {
    console.log('Application stopped');
  }

  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('cats');
  }
}
