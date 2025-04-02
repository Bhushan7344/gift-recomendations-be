import { Test, TestingModule } from '@nestjs/testing';
import { GiftHistoryController } from './gift-history.controller';

describe('GiftHistoryController', () => {
  let controller: GiftHistoryController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GiftHistoryController],
    }).compile();

    controller = module.get<GiftHistoryController>(GiftHistoryController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
