import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProfesorEntity } from './profesor.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ProfesorService {
    constructor (
        @InjectRepository(ProfesorEntity)
        private readonly profesorRepository: Repository<ProfesorEntity>
    ) {}

    async crearProfesor(profesor: ProfesorEntity): Promise<ProfesorEntity> {
        return await this.profesorRepository.save(profesor);
    }

    async asignarEvaluador(id: string) {
        
    }
}
