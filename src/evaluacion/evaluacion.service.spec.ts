import { Test, TestingModule } from '@nestjs/testing';
import { EvaluacionService } from './evaluacion.service';
import { TypeOrmTestingConfig } from 'src/shared/testing-utils/typeorm-testing-config';
import { Repository } from 'typeorm';
import { EvaluacionEntity } from './evaluacion.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { faker } from '@faker-js/faker';
import { ProfesorEntity } from 'src/profesor/profesor.entity';
import { ProyectoEntity } from 'src/proyecto/proyecto.entity';

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

  it('crearEvaluacion debería crear una nueva evaluación', async () => {
    const evaluacion: EvaluacionEntity = {
      id: '',
      profesor: { id: faker.string.uuid() } as ProfesorEntity,
      proyecto: { id: faker.string.uuid() } as ProyectoEntity,
    };

    const nuevaEvaluacion = await service.crearEvaluacion(evaluacion);
    expect(nuevaEvaluacion).not.toBeNull();

    const savedEvaluacion = await repository.findOne({ where: { id: nuevaEvaluacion.id } });
    expect(savedEvaluacion).not.toBeNull();
    expect(savedEvaluacion.profesor.id).toEqual(evaluacion.profesor.id);
    expect(savedEvaluacion.proyecto.id).toEqual(evaluacion.proyecto.id);
  });

  it('debería lanzar un error si no se envía nada', async () => {
    await expect(() => service.crearEvaluacion(undefined))
      .rejects.toThrow();
  });

});