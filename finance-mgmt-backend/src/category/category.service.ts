import { InjectRepository } from '@nestjs/typeorm';
import { CategoryEntity } from '../entities/Category.entity';
import { Repository } from 'typeorm';

export class CategoryService {
  constructor(
    @InjectRepository(CategoryEntity)
    private readonly categoryRepository: Repository<CategoryEntity>,
  ) {}

  async save(category: CategoryEntity) {
    await this.categoryRepository.save(category);
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
