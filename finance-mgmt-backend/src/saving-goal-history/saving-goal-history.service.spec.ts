import { Test, TestingModule } from '@nestjs/testing';
import { SavingGoalHistoryService } from './saving-goal-history.service';

describe('SavingGoalHistoryService', () => {
  let service: SavingGoalHistoryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SavingGoalHistoryService],
    }).compile();

    service = module.get<SavingGoalHistoryService>(SavingGoalHistoryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
