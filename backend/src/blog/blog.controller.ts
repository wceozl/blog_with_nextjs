import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  Query,
} from '@nestjs/common';
import { BlogService } from './blog.service';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { QueryArticlesDto } from './dto/query-articles.dto';

@Controller('blog')
export class BlogController {
  constructor(private readonly blogService: BlogService) {}

  @Post()
  async create(@Body() createArticleDto: CreateArticleDto) {
    const article = await this.blogService.create(createArticleDto);

    return {
      success: true,
      message: '文章创建成功',
      data: article,
    };
  }

  @Get()
  async findAll(@Query() queryDto: QueryArticlesDto) {
    const result = await this.blogService.findAll(queryDto);

    return {
      success: true,
      message: '获取文章列表成功',
      data: result,
    };
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const article = await this.blogService.findOne(id);

    return {
      success: true,
      message: '获取文章详情成功',
      data: article,
    };
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateArticleDto: UpdateArticleDto,
  ) {
    const article = await this.blogService.update(id, updateArticleDto);

    return {
      success: true,
      message: '文章更新成功',
      data: article,
    };
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    await this.blogService.remove(id);

    return {
      success: true,
      message: '文章删除成功',
    };
  }
}
