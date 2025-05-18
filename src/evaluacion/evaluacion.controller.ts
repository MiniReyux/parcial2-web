import { Body, Controller, Post } from '@nestjs/common';
import { EvaluacionService } from './evaluacion.service';
import { EvaluacionDTO } from './evaluacion.dto';
import { EvaluacionEntity } from './evaluacion.entity';
import { plainToInstance } from 'class-transformer';

@Controller('evaluaciones')
export class EvaluacionController {
    constructor (private readonly evaluacionService: EvaluacionService) {}
    
    @Post()
    async crearEvaluacion(@Body() evaluacionDTO: EvaluacionDTO) {
        const evaluacion: EvaluacionEntity = plainToInstance(EvaluacionEntity, evaluacionDTO);
        return await this.evaluacionService.crearEvaluacion(evaluacion);
    }
}
