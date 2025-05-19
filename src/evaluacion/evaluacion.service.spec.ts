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
  let profesorRepository: Repository<ProfesorEntity>;
  let proyectoRepository: Repository<ProyectoEntity>;


  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [...TypeOrmTestingConfig()],
      providers: [EvaluacionService],
    }).compile();

    service = module.get<EvaluacionService>(EvaluacionService);
    repository = module.get<Repository<EvaluacionEntity>>(getRepositoryToken(EvaluacionEntity));
    profesorRepository = module.get<Repository<ProfesorEntity>>(getRepositoryToken(ProfesorEntity));
    proyectoRepository = module.get<Repository<ProyectoEntity>>(getRepositoryToken(ProyectoEntity));

  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('crearEvaluacion debería crear una nueva evaluación', async () => {
    const profesor = await profesorRepository.save({
    cedula: 123456,
    nombre: 'Nombre del profesor',
    departamento: 'Ingeniería',
    extension: 1234,
    esParEvaluado: false,
    mentorias: [],
    evaluaciones: [],
  });

  const proyecto = await proyectoRepository.save({
    titulo: 'Título válido y suficientemente largo',
    area: 'Ciencias',
    presupuesto: 2000,
    nota_final: 4.2,
    estado: 1,
    fecha_inicio: '2023-01-01',
    fecha_fin: '2023-12-01',
    lider: null,
    mentor: null,
    evaluaciones: [],
  });

  const evaluacion: EvaluacionEntity = {
    id: '',
    profesor: profesor,
    proyecto: proyecto,
  };

  const nuevaEvaluacion = await service.crearEvaluacion(evaluacion);
  expect(nuevaEvaluacion).not.toBeNull();

  const savedEvaluacion = await repository.findOne({
    where: { id: nuevaEvaluacion.id },
    relations: ['profesor', 'proyecto'],
  });

  expect(savedEvaluacion).not.toBeNull();
  expect(savedEvaluacion.profesor.id).toEqual(profesor.id);
  expect(savedEvaluacion.proyecto.id).toEqual(proyecto.id);
  });

  it('debería lanzar un error si no se envía nada', async () => {
    await expect(() => service.crearEvaluacion(undefined))
      .rejects.toThrow();
  });

});