import { Test, TestingModule } from '@nestjs/testing';
import { ProyectoService } from './proyecto.service';
import { TypeOrmTestingConfig } from 'src/shared/testing-utils/typeorm-testing-config';
import { Repository } from 'typeorm';
import { ProyectoEntity } from './proyecto.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { EstudianteEntity } from 'src/estudiante/estudiante.entity';
import { faker } from '@faker-js/faker';
import { BusinessLogicException } from 'src/shared/errors/business-errors';

describe('ProyectoService', () => {
  let service: ProyectoService;
  let repository: Repository<ProyectoEntity>
  let proyectosList: ProyectoEntity[];

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [...TypeOrmTestingConfig()],
      providers: [ProyectoService],
    }).compile();

    service = module.get<ProyectoService>(ProyectoService);
    repository = module.get<Repository<ProyectoEntity>>(getRepositoryToken(ProyectoEntity));
    await seedDatabase();
  });

  const seedDatabase = async () => {
    repository.clear();
    proyectosList = [];
    for (let i = 0; i < 5; i++) {
      const proyecto: ProyectoEntity = await repository.save({
        titulo: faker.lorem.words(4),
        area: faker.commerce.department(),
        presupuesto: faker.number.float({ min: 1000 }),
        nota_final: faker.number.float({ min: 1, max: 5 }),
        estado: faker.number.int({ min: 0, max: 3 }),
        fecha_inicio: faker.date.past().toISOString(),
        fecha_fin: faker.date.future().toISOString(),
        lider: null,
        mentor: null,
        evaluaciones: [],
      });
      proyectosList.push(proyecto);
    }
  };

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('crearProyecto', () => {
    it('debería crear un proyecto válido', async () => {
      const proyecto: ProyectoEntity = {
        id: '',
        titulo: faker.lorem.sentence(4),
        area: faker.commerce.department(),
        presupuesto: 2000,
        nota_final: 4.5,
        estado: 1,
        fecha_inicio: faker.date.past().toISOString(),
        fecha_fin: faker.date.future().toISOString(),
        lider: null,
        mentor: null,
        evaluaciones: [],
      };

      const result = await service.crearProyecto(proyecto);
      expect(result).not.toBeNull();
      expect(result.id).toBeDefined();
    });

    it('debería lanzar excepción si el proyecto es inválido', async () => {
      const proyectoInvalido: ProyectoEntity = {
        id: '',
        titulo: 'corto',
        area: 'Tech',
        presupuesto: -100,
        nota_final: 4,
        estado: 2,
        fecha_inicio: '2023-01-01',
        fecha_fin: '2024-01-01',
        lider: null,
        mentor: null,
        evaluaciones: [],
      };

      await expect(() => service.crearProyecto(proyectoInvalido))
        .rejects.toBeInstanceOf(BusinessLogicException);
    });
  });

  describe('avanzarProyecto', () => {
    it('debería avanzar el estado del proyecto', async () => {
      const proyecto = proyectosList[0];
      const estadoInicial = proyecto.estado;
      const resultado = await service.avanzarProyecto(proyecto.id);
      expect(resultado.estado).toBe(estadoInicial + 1);
    });

    it('debería lanzar excepción si el proyecto no existe', async () => {
      await expect(() => service.avanzarProyecto('0'))
        .rejects.toBeInstanceOf(BusinessLogicException);
    });

    it('debería lanzar excepción si el proyecto ya está en estado máximo', async () => {
      const proyecto = await repository.save({
        ...proyectosList[0],
        estado: 4,
      });

      await expect(() => service.avanzarProyecto(proyecto.id))
        .rejects.toBeInstanceOf(BusinessLogicException);
    });
  });

  describe('findAllEstudiantes', () => {
    it('debería retornar el líder del proyecto', async () => {
      const estudiante: EstudianteEntity = {
        id: faker.string.uuid(),
        cedula: 123456,
        nombre: 'Juan Pérez',
        programa: 'Ingeniería',
        promedio: 4.2,
        proyectos: [],
      };

      const proyecto = await repository.save({
        ...proyectosList[1],
        lider: estudiante,
      });

      const result = await service.findAllEstudiantes(proyecto.id);
      expect(result).not.toBeNull();
      expect(result.nombre).toEqual('Juan Pérez');
    });

    it('debería lanzar excepción si el proyecto no existe', async () => {
      await expect(() => service.findAllEstudiantes('0'))
        .rejects.toBeInstanceOf(BusinessLogicException);
    });

    it('debería lanzar excepción si el proyecto no tiene estudiante líder', async () => {
      const proyecto = proyectosList[2];
      await expect(() => service.findAllEstudiantes(proyecto.id))
        .rejects.toBeInstanceOf(BusinessLogicException);
    });
  });
});