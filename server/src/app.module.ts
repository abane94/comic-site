import { Module } from '@nestjs/common';
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

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', '..', 'client', 'dist', 'lixes-client'),
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
    configProvider
  ]
})
export class AppModule {}
