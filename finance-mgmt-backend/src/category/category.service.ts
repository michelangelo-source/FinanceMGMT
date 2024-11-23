import { InjectRepository } from '@nestjs/typeorm';
import { CategoryEntity } from '../entities/Category.entity';
import { Repository } from 'typeorm';
import { CategoryDTO } from './categoryDTO';

export class CategoryService {
  constructor(
    @InjectRepository(CategoryEntity)
    private readonly categoryRepository: Repository<CategoryEntity>,
  ) {}

  async save(category: CategoryDTO) {
    const newCategory = this.categoryRepository.create({
      Category: category.Category,
      is_expanse: category.is_expanse,
    });
    return this.categoryRepository.save(newCategory);
  }

  async getAll() {
    return this.categoryRepository.find();
  }

  async getExpansesCategory() {
    return this.categoryRepository.findBy({ is_expanse: true });
  }

  async getIncomesCategory() {
    return this.categoryRepository.findBy({ is_expanse: false });
  }
}
