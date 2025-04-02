import { Test, TestingModule } from '@nestjs/testing';
import { RelatePreferencesService } from './relate-preferences.service';

describe('RelatePreferencesService', () => {
  let service: RelatePreferencesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RelatePreferencesService],
    }).compile();

    service = module.get<RelatePreferencesService>(RelatePreferencesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
