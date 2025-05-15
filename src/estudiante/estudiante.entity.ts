import { ProyectoEntity } from "src/proyecto/proyecto.entity";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class EstudianteEntity {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column()
    cedula: number;

    @Column()
    nombre: string;

    @Column()
    programa: string;

    @Column()
    promedio: number;

    @OneToMany(() => ProyectoEntity, proyecto => proyecto.lider)
    proyectos: ProyectoEntity[];
}