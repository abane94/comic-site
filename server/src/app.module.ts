import { Module, MiddlewareConsumer, NestModule } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SeriesModule } from './series/series.module';
import { BookModule } from './book/book.module';
import { UserModule } from './user/user.module';
import { FeedModule } from './feed/feed.module';
import { UploadModule } from './upload/upload.module';
import { DataModule } from './data/data.module';
import configProvider from './config-provider';
import { ApplyUserMiddleware } from './user/applyUser.middleware';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { APIWrapInterceptor } from './shared/interceptors/api-wrap.interceptor';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', '..', 'client', 'dist', 'lixes-client'),
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, 'upload-data'),
      serveRoot: '/temp'
    }),
    SeriesModule,
    BookModule,
    UserModule,
    FeedModule,
    UploadModule,
    DataModule
  ],
  controllers: [AppController],
  providers: [
    AppService,
    configProvider,
    {
      provide: APP_INTERCEPTOR,
      useClass: APIWrapInterceptor,
    }
  ]
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    console.log('Configuring Module');
    consumer
      .apply(ApplyUserMiddleware)
      .forRoutes('*');
    }

}
// export class AppModule{}
