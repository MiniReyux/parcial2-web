import { Controller } from '@nestjs/common';
import { ProfesorService } from './profesor.service';

@Controller('profesores')
export class ProfesorController {
    constructor (private readonly profesorService:ProfesorService) {}
    
}
