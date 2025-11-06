import { Test, TestingModule } from '@nestjs/testing';
import { ComutilService } from './comutil.service';

describe('ComutilService', () => {
  let service: ComutilService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ComutilService],
    }).compile();

    service = module.get<ComutilService>(ComutilService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
