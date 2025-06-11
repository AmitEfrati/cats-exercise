import { Controller, Get, Post, Body } from '@nestjs/common';
import { Query } from '@nestjs/common';
import { CatsService } from './cats.service';
import { Cat } from 'src/models/cat.model';
import { CreateCatDto } from './dto/create-cat.dto';

@Controller('cats')
export class CatsController {
  constructor(private readonly catsService: CatsService) {}

  @Get()
  async getCats(
    @Query('name') name?: string,
    @Query('mouseName') mouseName?: string,
  ): Promise<Cat[]> {
    return this.catsService.getCats({ name, mouseName });
  }

  @Post()
  async create(@Body() body: CreateCatDto): Promise<Cat> {
    return this.catsService.create(body);
  }
}
