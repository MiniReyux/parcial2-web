import { Body, Controller, Get, Param, Post, Put, UseInterceptors } from '@nestjs/common';
import { ProyectoService } from './proyecto.service';
import { ProyectoDTO } from './proyecto.dto';
import { ProyectoEntity } from './proyecto.entity';
import { plainToInstance } from 'class-transformer';
import { BusinessErrorsInterceptor } from 'src/shared/interceptors/business-errors/business-errors.interceptor';

@Controller('proyectos')
@UseInterceptors(BusinessErrorsInterceptor)
export class ProyectoController {
    constructor (private readonly proyectoService: ProyectoService) {}
    
    @Post()
    async crearProyecto(@Body() proyectoDTO: ProyectoDTO) {
        const proyecto: ProyectoEntity = plainToInstance(ProyectoEntity, proyectoDTO);
        return await this.proyectoService.crearProyecto(proyecto);
    }

    @Put(":id")
    async avanzarProyecto(@Param("id") proyectoId: string) {
        return await this.proyectoService.avanzarProyecto(proyectoId);
    }

    @Get(":id")
    async findAllEstudiantes(@Param("id") proyectoId: string) {
        return await this.findAllEstudiantes(proyectoId);
    }
}
