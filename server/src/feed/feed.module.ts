import { Module } from '@nestjs/common';
import { FeedController } from './feed/feed.controller';

@Module({
  controllers: [FeedController]
})
export class FeedModule {}
