import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class EstudianteDTO {
    @IsNumber()
    @IsNotEmpty()
    readonly cedula: number;

    @IsString()
    @IsNotEmpty()
    readonly nombre: string;

    @IsString()
    @IsNotEmpty()
    readonly programa: string;

    @IsNumber()
    @IsNotEmpty()
    readonly promedio: number;
}