import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Category } from './entities/category.entity';

@Injectable()
export class CategoryService {
  constructor(@InjectRepository(Category) private categoryRepository: Repository<Category>) {}

  create(createCategoryDto: CreateCategoryDto) {
    return this.categoryRepository.save(createCategoryDto);
  }

  async findAll(): Promise<Category[]> {
    return this.categoryRepository.find({
      relations: {
        posts: true
      }
    });
  }

  async findOne(id: string): Promise<Category> {
    return this.categoryRepository.findOneBy({id});
  }

  async update(id: string, updateCategoryDto: UpdateCategoryDto) {
    return this.categoryRepository.update({id}, updateCategoryDto);
  }

  async remove(id: string) {
    return this.categoryRepository.delete({id});
  }
}
