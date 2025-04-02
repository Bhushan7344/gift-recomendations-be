import { Test, TestingModule } from '@nestjs/testing';
import { GiftHistoryService } from './gift-history.service';

describe('GiftHistoryService', () => {
  let service: GiftHistoryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GiftHistoryService],
    }).compile();

    service = module.get<GiftHistoryService>(GiftHistoryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
