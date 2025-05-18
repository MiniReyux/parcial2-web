import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class ProyectoDTO {
    @IsString()
    @IsNotEmpty()
    readonly titulo: string;

    @IsString()
    @IsNotEmpty()
    readonly area: string;

    @IsNumber()
    @IsNotEmpty()
    readonly presupuesto: number;

    @IsNumber()
    @IsNotEmpty()
    readonly nota_final: number;

    @IsNumber()
    @IsNotEmpty()
    readonly estado: number;

    @IsString()
    @IsNotEmpty()
    readonly fecha_inicio: string;

    @IsString()
    @IsNotEmpty()
    readonly fecha_fin: string;
}