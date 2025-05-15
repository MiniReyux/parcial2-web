import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProfesorEntity } from './profesor.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ProfesorService {
    constructor (
        @InjectRepository(ProfesorEntity)
        private readonly estudianteRepository: Repository<ProfesorEntity>
    ) {}

    async crearProfesor() {

    }

    async asignarEvaluador() {
        
    }
}
