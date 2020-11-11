import { Module } from '@nestjs/common';
import { BookController } from './book/book.controller';
import { DataModule } from '../data/data.module';
import configProvider from '../config-provider';

@Module({
  imports: [DataModule],
  controllers: [BookController],
  providers: [configProvider]
})
export class BookModule {
}
