import { Body, Controller, Param, Post, Put, UseInterceptors } from '@nestjs/common';
import { ProfesorService } from './profesor.service';
import { ProfesorDTO } from './profesor.dto';
import { ProfesorEntity } from './profesor.entity';
import { plainToInstance } from 'class-transformer';
import { BusinessErrorsInterceptor } from 'src/shared/interceptors/business-errors/business-errors.interceptor';

@Controller('profesores')
@UseInterceptors(BusinessErrorsInterceptor)
export class ProfesorController {
    constructor (private readonly profesorService:ProfesorService) {}
    
    @Post('create')
    async crearProfesor(@Body() profesorDTO: ProfesorDTO) {
        const profesor: ProfesorEntity = plainToInstance(ProfesorEntity, profesorDTO);
        return await this.profesorService.crearProfesor(profesor);
    }

    @Put(":id")
    async asignarEvaluador(@Param("id") profesorId: string) {
        return await this.profesorService.asignarEvaluador(profesorId);
    }
}
