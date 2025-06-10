import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Article } from './article.entity';

@Injectable()
export class ArticleService {
  constructor(
    @InjectRepository(Article)
    private articleRepository: Repository<Article>,
  ) {}

  async create(articleData: Partial<Article>): Promise<Article> {
    const article = this.articleRepository.create(articleData);
    return this.articleRepository.save(article);
  }

  async findAll(): Promise<Article[]> {
    return this.articleRepository.find({ relations: ['author'] });
  }

  async findOne(id: number): Promise<Article> {
    return this.articleRepository.findOne({
      where: { id },
      relations: ['author'],
    });
  }

  async update(id: number, articleData: Partial<Article>): Promise<Article> {
    await this.articleRepository.update(id, articleData);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.articleRepository.delete(id);
  }
}
