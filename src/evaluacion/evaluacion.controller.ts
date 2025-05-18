import { Controller } from '@nestjs/common';
import { EvaluacionService } from './evaluacion.service';

@Controller('evaluaciones')
export class EvaluacionController {
    constructor (private readonly evaluacionService: EvaluacionService) {}
    
}
