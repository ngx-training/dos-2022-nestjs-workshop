import { PartialType } from '@nestjs/mapped-types';
import { IsOptional } from 'class-validator';
import { CreatePostDto } from './create-post.dto';

export class UpdatePostDto extends PartialType(CreatePostDto) {
    @IsOptional()
    updated_at: string;
}
