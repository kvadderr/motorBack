import { Test, TestingModule } from '@nestjs/testing';
import { SpaceworkController } from './spacework.controller';
import { SpaceworkService } from './spacework.service';

describe('SpaceworkController', () => {
  let controller: SpaceworkController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SpaceworkController],
      providers: [SpaceworkService],
    }).compile();

    controller = module.get<SpaceworkController>(SpaceworkController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
