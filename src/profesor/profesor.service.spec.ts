import { Test, TestingModule } from '@nestjs/testing';
import { ProfesorService } from './profesor.service';
import { TypeOrmTestingConfig } from 'src/shared/testing-utils/typeorm-testing-config';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { ProfesorEntity } from './profesor.entity';
import { faker } from '@faker-js/faker';

describe('ProfesorService', () => {
  let service: ProfesorService;
  let repository: Repository<ProfesorEntity>;
  let profesoresList: ProfesorEntity[];

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [...TypeOrmTestingConfig()],
      providers: [ProfesorService],
    }).compile();

    service = module.get<ProfesorService>(ProfesorService);
    repository = module.get<Repository<ProfesorEntity>>(getRepositoryToken(ProfesorEntity));
    await seedDatabase();
  });

  const seedDatabase = async () => {
    repository.clear();
    profesoresList = [];
    for (let i = 0; i < 5; i++) {
      const profesor: ProfesorEntity = await repository.save({
        cedula: faker.number.int({ min: 1000000, max: 99999999 }),
        nombre: faker.person.fullName(),
        departamento: faker.commerce.department(),
        extension: faker.number.int({ min: 1000, max: 9999 }),
        esParEvaluado: faker.datatype.boolean(),
        mentorias: [],
        evaluaciones: [],
      });
      profesoresList.push(profesor);
    }
  };

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('crearProfesor debería crear un nuevo profesor', async () => {
      const profesor: ProfesorEntity = {
        id: '',
        cedula: faker.number.int({ min: 1000000, max: 99999999 }),
        nombre: faker.person.fullName(),
        departamento: faker.commerce.department(),
        extension: faker.number.int({ min: 1000, max: 9999 }),
        esParEvaluado: false,
        mentorias: [],
        evaluaciones: [],
      };

      const nuevoProfesor = await service.crearProfesor(profesor);
      expect(nuevoProfesor).not.toBeNull();

      const savedProfesor = await repository.findOne({ where: { id: nuevoProfesor.id } });
      expect(savedProfesor).not.toBeNull();
      expect(savedProfesor.cedula).toEqual(profesor.cedula);
      expect(savedProfesor.nombre).toEqual(profesor.nombre);
      expect(savedProfesor.departamento).toEqual(profesor.departamento);
      expect(savedProfesor.extension).toEqual(profesor.extension);
      expect(savedProfesor.esParEvaluado).toEqual(profesor.esParEvaluado);
    });

    it('debería lanzar un error si no se envía nada', async () => {
      await expect(() => service.crearProfesor(undefined))
        .rejects.toThrow();
    });


});
