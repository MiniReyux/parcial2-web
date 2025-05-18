import { Test, TestingModule } from '@nestjs/testing';
import { EvaluacionService } from './evaluacion.service';
import { TypeOrmTestingConfig } from 'src/shared/testing-utils/typeorm-testing-config';
import { Repository } from 'typeorm';
import { EvaluacionEntity } from './evaluacion.entity';
import { getRepositoryToken } from '@nestjs/typeorm';

describe('EvaluacionService', () => {
  let service: EvaluacionService;
  let repository: Repository<EvaluacionEntity>

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [...TypeOrmTestingConfig()],
      providers: [EvaluacionService],
    }).compile();

    service = module.get<EvaluacionService>(EvaluacionService);
    repository = module.get<Repository<EvaluacionEntity>>(getRepositoryToken(EvaluacionEntity));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
