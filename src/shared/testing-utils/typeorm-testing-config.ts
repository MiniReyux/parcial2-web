import { TypeOrmModule } from '@nestjs/typeorm';
import { EstudianteEntity } from 'src/estudiante/estudiante.entity';
import { EvaluacionEntity } from 'src/evaluacion/evaluacion.entity';
import { ProfesorEntity } from 'src/profesor/profesor.entity';
import { ProyectoEntity } from 'src/proyecto/proyecto.entity';

export const TypeOrmTestingConfig = () => [
 TypeOrmModule.forRoot({
   type: 'sqlite',
   database: ':memory:',
   dropSchema: true,
   entities: [EstudianteEntity, EvaluacionEntity, ProfesorEntity, ProyectoEntity],
   synchronize: true,
 }),
 TypeOrmModule.forFeature([EstudianteEntity, EvaluacionEntity, ProfesorEntity, ProyectoEntity]),
];