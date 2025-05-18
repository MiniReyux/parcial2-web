import { Controller } from '@nestjs/common';
import { ProyectoService } from './proyecto.service';

@Controller('proyectos')
export class ProyectoController {
    constructor (private readonly proyectoService: ProyectoService) {}
    
}
