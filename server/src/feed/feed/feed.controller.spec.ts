import { Test, TestingModule } from '@nestjs/testing';
import { FeedController } from './feed.controller';

describe('Feed Controller', () => {
  let module: TestingModule;
  beforeAll(async () => {
    module = await Test.createTestingModule({
      controllers: [FeedController],
    }).compile();
  });
  it('should be defined', () => {
    const controller: FeedController = module.get<FeedController>(FeedController);
    expect(controller).toBeDefined();
  });
});
