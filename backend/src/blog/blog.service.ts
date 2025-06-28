import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Article } from '../entities/article.entity';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { QueryArticlesDto } from './dto/query-articles.dto';

@Injectable()
export class BlogService {
  constructor(
    @InjectRepository(Article)
    private readonly articleRepository: Repository<Article>,
  ) {}

  async create(createArticleDto: CreateArticleDto): Promise<Article> {
    const publishDate =
      createArticleDto.publishDate || new Date().toISOString().split('T')[0];

    const article = this.articleRepository.create({
      ...createArticleDto,
      publishDate,
    });

    return await this.articleRepository.save(article);
  }

  async findAll(queryDto: QueryArticlesDto) {
    const { page = 1, pageSize = 10, keyword, tag } = queryDto;

    const queryBuilder = this.articleRepository.createQueryBuilder('article');

    if (keyword) {
      queryBuilder.andWhere(
        '(article.title ILIKE :keyword OR article.content ILIKE :keyword)',
        { keyword: `%${keyword}%` },
      );
    }

    if (tag) {
      queryBuilder.andWhere('article.tags ILIKE :tag', { tag: `%${tag}%` });
    }

    queryBuilder.orderBy('article.createdAt', 'DESC');

    const skip = (page - 1) * pageSize;
    queryBuilder.skip(skip).take(pageSize);

    const [articles, total] = await queryBuilder.getManyAndCount();

    return {
      list: articles,
      total,
      page,
      pageSize,
    };
  }

  async findOne(id: string): Promise<Article> {
    const article = await this.articleRepository.findOne({
      where: { id },
    });

    if (!article) {
      throw new NotFoundException(`文章 ID ${id} 不存在`);
    }

    return article;
  }

  async update(
    id: string,
    updateArticleDto: UpdateArticleDto,
  ): Promise<Article> {
    const article = await this.findOne(id);
    Object.assign(article, updateArticleDto);
    return await this.articleRepository.save(article);
  }

  async remove(id: string): Promise<void> {
    const article = await this.findOne(id);
    await this.articleRepository.remove(article);
  }
}
