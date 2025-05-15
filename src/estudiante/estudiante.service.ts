import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EstudianteEntity } from './estudiante.entity';
import { Repository } from 'typeorm';

@Injectable()
export class EstudianteService {
    constructor (
        @InjectRepository(EstudianteEntity)
        private readonly estudianteRepository: Repository<EstudianteEntity>
    ) {}

    async crearEstudiante(estudiante: EstudianteEntity): Promise<EstudianteEntity> {
        return await this.estudianteRepository.save(estudiante);
    }

    async eliminarEstudiante(id: string) {
        const estudiante: EstudianteEntity = await this.estudianteRepository.findOne({where:{id}})
        if (!estudiante)
            throw new TypeError("no encontrado")
        return this.estudianteRepository.remove(estudiante);
    }
}
