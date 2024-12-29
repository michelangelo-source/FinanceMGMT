import { Test, TestingModule } from '@nestjs/testing';
import { SavingGoalHistoryController } from './saving-goal-history.controller';

describe('SavingGoalHistoryController', () => {
  let controller: SavingGoalHistoryController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SavingGoalHistoryController],
    }).compile();

    controller = module.get<SavingGoalHistoryController>(
      SavingGoalHistoryController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
