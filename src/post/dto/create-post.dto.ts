import { IsNotEmpty, IsOptional } from "class-validator";

export class CreatePostDto {
    @IsNotEmpty()
    title: string;

    @IsOptional()
    description: string;

    @IsOptional()
    content: string;
}
