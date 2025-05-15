import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EvaluacionEntity } from './evaluacion.entity';
import { Repository } from 'typeorm';

@Injectable()
export class EvaluacionService {
    constructor (
        @InjectRepository(EvaluacionEntity)
        private readonly estudianteRepository: Repository<EvaluacionEntity>
    ) {}

    async crearEvaluacion() {
        
    }
}
