import { Module } from '@nestjs/common';
import { BookController } from './book/book.controller';
import { DataModule } from 'src/data/data.module';
import configProvider from 'src/config-provider';

@Module({
  imports: [DataModule],
  controllers: [BookController],
  providers: [configProvider]
})
export class BookModule {
}
