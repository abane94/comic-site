import { Module } from '@nestjs/common';
import { BookController } from './book/book.controller';

@Module({
  controllers: [BookController]
})
export class BookModule {
}
