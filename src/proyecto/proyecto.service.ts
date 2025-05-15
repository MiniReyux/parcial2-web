import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProyectoEntity } from './proyecto.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ProyectoService {
    constructor (
        @InjectRepository(ProyectoEntity)
        private readonly estudianteRepository: Repository<ProyectoEntity>
    ) {}

    async crearProyecto(proyecto: ProyectoEntity): Promise<ProyectoEntity> {
        
        if (!(proyecto.presupuesto > 0 && proyecto.titulo.length>15))
            throw new TypeError("proyecto inválido");
        return await this.estudianteRepository.save(proyecto);
    }

    async avanzarProyecto(id: string) {
        const proyecto: ProyectoEntity = await this.estudianteRepository.findOne({where:{id}});
        if (!proyecto)
            throw new TypeError("no econtrado");
        if (proyecto.estado === 4 )
            throw new TypeError("proyecto ya está en estado max");
        if (0 <= proyecto.estado && proyecto.estado < 4)
            ++proyecto.estado;
        return await this.estudianteRepository.save(proyecto);

    }

    async findAllEstudiantes() {

    }
}
