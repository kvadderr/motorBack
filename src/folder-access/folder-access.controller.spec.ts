import { Test, TestingModule } from '@nestjs/testing';
import { FolderAccessController } from './folder-access.controller';
import { FolderAccessService } from './folder-access.service';

describe('FolderAccessController', () => {
  let controller: FolderAccessController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FolderAccessController],
      providers: [FolderAccessService],
    }).compile();

    controller = module.get<FolderAccessController>(FolderAccessController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
