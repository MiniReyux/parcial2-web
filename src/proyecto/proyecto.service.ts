import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProyectoEntity } from './proyecto.entity';
import { Repository } from 'typeorm';
import { EstudianteEntity } from 'src/estudiante/estudiante.entity';
import { BusinessError, BusinessLogicException } from 'src/shared/errors/business-errors';

@Injectable()
export class ProyectoService {
    constructor (
        @InjectRepository(ProyectoEntity)
        private readonly estudianteRepository: Repository<ProyectoEntity>
    ) {}

    async crearProyecto(proyecto: ProyectoEntity): Promise<ProyectoEntity> {
        
        if (!(proyecto.presupuesto > 0 && proyecto.titulo.length>15 && (proyecto.estado<0 || proyecto.estado>4)))
            throw new BusinessLogicException("proyecto inválido", BusinessError.PRECONDITION_FAILED);
        return await this.estudianteRepository.save(proyecto);
    }

    async avanzarProyecto(id: string) {
        const proyecto: ProyectoEntity = await this.estudianteRepository.findOne({where:{id}});
        if (!proyecto)
            throw new BusinessLogicException("proyecto no econtrado", BusinessError.NOT_FOUND);
        if (proyecto.estado === 4 )
            throw new BusinessLogicException("proyecto ya está en estado máximo", BusinessError.PRECONDITION_FAILED);
        if (0 <= proyecto.estado && proyecto.estado < 4)
            ++proyecto.estado;
        return await this.estudianteRepository.save(proyecto);

    }

    async findAllEstudiantes(id: string): Promise<EstudianteEntity> {
        const proyecto: ProyectoEntity = await this.estudianteRepository.findOne({where:{id}});
        if (!proyecto)
            throw new BusinessLogicException("proyecto no econtrado", BusinessError.NOT_FOUND);
        if (!proyecto.lider)
            throw new BusinessLogicException("proyecto sin estudiantes", BusinessError.PRECONDITION_FAILED)
        return proyecto.lider;

    }
}
