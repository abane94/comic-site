import { Test, TestingModule } from '@nestjs/testing';
import { SeriesController } from './series.controller';

describe('Series Controller', () => {
  let module: TestingModule;
  beforeAll(async () => {
    module = await Test.createTestingModule({
      controllers: [SeriesController],
    }).compile();
  });
  it('should be defined', () => {
    const controller: SeriesController = module.get<SeriesController>(SeriesController);
    expect(controller).toBeDefined();
  });
});
