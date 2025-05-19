import { Body, Controller, Delete, Param, Post, UseInterceptors } from '@nestjs/common';
import { BusinessErrorsInterceptor } from 'src/shared/interceptors/business-errors/business-errors.interceptor';
import { EstudianteService } from './estudiante.service';
import { EstudianteDTO } from './estudiante.dto';
import { EstudianteEntity } from './estudiante.entity';
import { plainToInstance } from 'class-transformer';

@Controller('estudiantes')
@UseInterceptors(BusinessErrorsInterceptor)
export class EstudianteController {
    constructor (private readonly estudianteService: EstudianteService) {}

    @Post('create')
    async crearEstudiante(@Body() estudianteDTO: EstudianteDTO) {
        const estudiante: EstudianteEntity = plainToInstance(EstudianteEntity, estudianteDTO)
        return await this.estudianteService.crearEstudiante(estudiante);
    }

    @Delete(":id")
    async eliminarEstudiante(@Param("id") estudianteId: string) {
        return await this.estudianteService.eliminarEstudiante(estudianteId);
    }
}
