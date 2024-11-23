import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { CategoryService } from './category.service';
import { TokenGuard } from '../token/token.guard';
import { CategoryDTO } from './categoryDTO';

@Controller('categories')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post()
  @UseGuards(TokenGuard)
  async addCategory(@Body() category: CategoryDTO) {
    await this.categoryService.save(category);
  }

  @Get()
  @UseGuards(TokenGuard)
  async getAll() {
    return await this.categoryService.getAll();
  }

  @Get('/expanses')
  @UseGuards(TokenGuard)
  async getExpanses() {
    return await this.categoryService.getExpansesCategory();
  }

  @Get('/incomes')
  @UseGuards(TokenGuard)
  async getIncomes() {
    return await this.categoryService.getIncomesCategory();
  }
}
