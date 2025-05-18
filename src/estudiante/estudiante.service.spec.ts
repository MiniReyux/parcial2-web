import { Test, TestingModule } from '@nestjs/testing';
import { EstudianteService } from './estudiante.service';
import { TypeOrmTestingConfig } from 'src/shared/testing-utils/typeorm-testing-config';
import { Repository } from 'typeorm';
import { EstudianteEntity } from './estudiante.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { faker } from '@faker-js/faker';
import { BusinessLogicException } from 'src/shared/errors/business-errors';

describe('EstudianteService', () => {
  let service: EstudianteService;
  let repository: Repository<EstudianteEntity>
  let estudiantesList: EstudianteEntity[];

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [...TypeOrmTestingConfig()],
      providers: [EstudianteService],
    }).compile();

    service = module.get<EstudianteService>(EstudianteService);
    repository = module.get<Repository<EstudianteEntity>>(getRepositoryToken(EstudianteEntity));
    await seedDatabase();
  });

  const seedDatabase = async () => {
    repository.clear();
    estudiantesList = [];
    for (let i = 0; i < 5; i++) {
      const estudiante: EstudianteEntity = await repository.save({
        cedula: faker.number.int({ min: 1000000, max: 99999999 }),
        nombre: faker.person.fullName(),
        programa: faker.word.words(2),
        promedio: faker.number.float({ min: 1, max: 5}),
        proyectos: [],
      });
      estudiantesList.push(estudiante);
    }
  };

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('crearEstudiante debería devolver un nuevo estudiante', async () => {
    const estudiante: EstudianteEntity = {
      id: '',
      cedula: faker.number.int({ min: 1000000, max: 99999999 }),
      nombre: faker.person.fullName(),
      programa: faker.word.words(2),
      promedio: faker.number.float({ min: 1, max: 5}),
      proyectos: [],
    };

    const newEstudiante: EstudianteEntity = await service.crearEstudiante(estudiante);
    expect(newEstudiante).not.toBeNull();

    const storedEstudiante = await repository.findOne({ where: { id: newEstudiante.id } });
    expect(storedEstudiante).not.toBeNull();
    expect(storedEstudiante.cedula).toEqual(estudiante.cedula);
    expect(storedEstudiante.nombre).toEqual(estudiante.nombre);
    expect(storedEstudiante.programa).toEqual(estudiante.programa);
    expect(storedEstudiante.promedio).toEqual(estudiante.promedio);
  });

  it('eliminarEstudiante debería eliminar un estudiante', async () => {
    const estudiante: EstudianteEntity = estudiantesList[0];
    await service.eliminarEstudiante(estudiante.id);

    const deleted = await repository.findOne({ where: { id: estudiante.id } });
    expect(deleted).toBeNull();
  });

  it('eliminarEstudiante debería lanzar una excepción para un id inválido', async () => {
    await expect(() => service.eliminarEstudiante('0')).rejects.toBeInstanceOf(BusinessLogicException);
  });
});
