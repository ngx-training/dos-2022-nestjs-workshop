import { MiddlewareConsumer, Module, OnApplicationShutdown, OnModuleInit } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { readFileSync } from 'fs';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CatsController } from './cats/cats.controller';
import { CatsService } from './cats/cats.service';
import configuration from './config/configuration';
import { LoggerMiddleware } from './logger/logger.middleware';
import { CategoryModule } from './category/category.module';
import { Category } from './category/entities/category.entity';
import { PostModule } from './post/post.module';
import { Post } from './post/entities/post.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DATABASE_HOST,
      port: parseInt(process.env.DATABASE_PORT, 10),
      username: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
      entities: [Category, Post],
      synchronize: true,
      ssl: {
        ca: readFileSync('ca-certificate.crt').toString(),
      },
      autoLoadEntities: true,
    }),
    CategoryModule,
    PostModule
  ],
  controllers: [AppController, CatsController],
  providers: [AppService, CatsService],
})
export class AppModule implements OnModuleInit, OnApplicationShutdown {
  constructor(private configService: ConfigService) {}

  onModuleInit(): void {
    console.log('Application start on port: ' + process.env.PORT);
    const database = this.configService.get<string>('DATABASE_NAME');
    console.log(`You are connected to ${database}`);
  }

  onApplicationShutdown(signal?: string) {
    console.log('Application stopped');
  }

  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('cats');
  }
}
