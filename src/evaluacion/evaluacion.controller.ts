import { Body, Controller, Post, UseInterceptors } from '@nestjs/common';
import { EvaluacionService } from './evaluacion.service';
import { EvaluacionDTO } from './evaluacion.dto';
import { EvaluacionEntity } from './evaluacion.entity';
import { plainToInstance } from 'class-transformer';
import { BusinessErrorsInterceptor } from 'src/shared/interceptors/business-errors/business-errors.interceptor';

@Controller('evaluaciones')
@UseInterceptors(BusinessErrorsInterceptor)
export class EvaluacionController {
    constructor (private readonly evaluacionService: EvaluacionService) {}
    
    @Post('create')
    async crearEvaluacion(@Body() evaluacionDTO: EvaluacionDTO) {
        const evaluacion: EvaluacionEntity = plainToInstance(EvaluacionEntity, evaluacionDTO);
        return await this.evaluacionService.crearEvaluacion(evaluacion);
    }
}
