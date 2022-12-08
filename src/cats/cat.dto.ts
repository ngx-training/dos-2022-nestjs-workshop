import { IsNotEmpty, IsNumber, IsOptional } from "class-validator";

export class CatDto {
    @IsNotEmpty()
    name: string;

    @IsOptional()
    @IsNumber()
    age: number;
}