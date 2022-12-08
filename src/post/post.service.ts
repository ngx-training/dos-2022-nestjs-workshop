import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { Post } from './entities/post.entity';

@Injectable()
export class PostService {
  constructor(@InjectRepository(Post) private postRepository: Repository<Post>) {}

  create(createPostDto: CreatePostDto) {
    return this.postRepository.save(createPostDto);
  }

  async findAll(): Promise<Post[]> {
    return this.postRepository.find({
      relations: {
        category: true
      }
    });
  }

  async findOne(id: string): Promise<Post> {
    return this.postRepository.findOne({
      where: { id: id },
      relations: { category: true }
    });
  }

  async update(id: string, updatePostDto: UpdatePostDto) {
    updatePostDto.updated_at = new Date().toISOString();
    return this.postRepository.update({id}, updatePostDto);
  }

  async remove(id: string) {
    return this.postRepository.delete({id});
  }
}
