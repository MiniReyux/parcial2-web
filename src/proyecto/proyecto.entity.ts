import { EstudianteEntity } from "src/estudiante/estudiante.entity";
import { EvaluacionEntity } from "src/evaluacion/evaluacion.entity";
import { ProfesorEntity } from "src/profesor/profesor.entity";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class ProyectoEntity {
    @PrimaryGeneratedColumn("uuid")
    id: number;

    @Column()
    titulo: string;

    @Column()
    area: string;

    @Column()
    presupuesto: number;

    @Column()
    nota_final: number;

    @Column()
    estado: number;

    @Column()
    fecha_inicio: string;

    @Column()
    fecha_fin: string;

    @ManyToOne(() => EstudianteEntity, estudiante => estudiante.proyectos)
    lider: EstudianteEntity;

    @ManyToOne(() => ProfesorEntity, profesor => profesor.mentorias)
    mentor: ProfesorEntity;

    @OneToMany(() => EvaluacionEntity, evaluacion => evaluacion.proyecto)
    evaluaciones: EvaluacionEntity[];
}   