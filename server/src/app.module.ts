import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SeriesModule } from './series/series.module';
import { BookModule } from './book/book.module';
import { UserModule } from './user/user.module';
import { FeedModule } from './feed/feed.module';
import { UploadModule } from './upload/upload.module';

@Module({
  imports: [SeriesModule, BookModule, UserModule, FeedModule, UploadModule],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
