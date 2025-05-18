import { Controller, UseInterceptors } from '@nestjs/common';
import { EstudianteEntity } from './estudiante.entity';
import { BusinessErrorsInterceptor } from 'src/shared/interceptors/business-errors/business-errors.interceptor';

@UseInterceptors(BusinessErrorsInterceptor)
@Controller('estudiante')
export class EstudianteController {
    constructor (private readonly estudianteEntity: EstudianteEntity) {}

}
