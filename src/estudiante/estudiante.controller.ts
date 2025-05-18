import { Controller, UseInterceptors } from '@nestjs/common';
import { BusinessErrorsInterceptor } from 'src/shared/interceptors/business-errors/business-errors.interceptor';
import { EstudianteService } from './estudiante.service';

@UseInterceptors(BusinessErrorsInterceptor)
@Controller('estudiantes')
export class EstudianteController {
    constructor (private readonly estudianteService: EstudianteService) {}

}
