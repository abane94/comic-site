import { Module } from '@nestjs/common';
import { SeriesController } from './series/series.controller';

@Module({
  controllers: [SeriesController]
})
export class SeriesModule {}
