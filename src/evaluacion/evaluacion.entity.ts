import { ProfesorEntity } from "src/profesor/profesor.entity";
import { ProyectoEntity } from "src/proyecto/proyecto.entity";
import { Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class EvaluacionEntity {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @ManyToOne(() => ProfesorEntity, profesor => profesor.evaluaciones)
    profesor: ProfesorEntity;

    @ManyToOne(() => ProyectoEntity, proyecto => proyecto.evaluaciones)
    proyecto: ProyectoEntity;
}   