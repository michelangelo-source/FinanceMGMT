import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { CategoryService } from './category.service';
import { TokenGuard } from '../token/token.guard';
import { CategoryDTO } from './categoryDTO';

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post()
  @UseGuards(TokenGuard)
  async addCategory(@Body() category: CategoryDTO) {
    await this.categoryService.save(category);
  }
}
