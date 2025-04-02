import { Test, TestingModule } from '@nestjs/testing';
import { RelatePreferencesController } from './relate-preferences.controller';

describe('RelatePreferencesController', () => {
  let controller: RelatePreferencesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RelatePreferencesController],
    }).compile();

    controller = module.get<RelatePreferencesController>(RelatePreferencesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
