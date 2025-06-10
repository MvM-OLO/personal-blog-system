import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Put,
  Delete,
  UseGuards,
  Request,
} from '@nestjs/common';
import { ArticleService } from './article.service';
import { Article } from './article.entity';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';

@ApiTags('文章')
@ApiBearerAuth()
@Controller('article')
export class ArticleController {
  constructor(private readonly articleService: ArticleService) {}

  @ApiOperation({ summary: '创建文章' })
  @ApiResponse({ status: 201, description: '创建成功' })
  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Body() articleData: Partial<Article>, @Request() req) {
    articleData.author.id = req.user.userId;
    return this.articleService.create(articleData);
  }

  @ApiOperation({ summary: '获取所有文章' })
  @ApiResponse({ status: 200, description: '获取成功' })
  @Get()
  async findAll() {
    return this.articleService.findAll();
  }

  @ApiOperation({ summary: '获取文章详情' })
  @ApiResponse({ status: 200, description: '获取成功' })
  @Get(':id')
  async findOne(@Param('id') id: number) {
    return this.articleService.findOne(id);
  }

  @ApiOperation({ summary: '更新文章' })
  @ApiResponse({ status: 200, description: '更新成功' })
  @UseGuards(JwtAuthGuard)
  @Put(':id')
  async update(@Param('id') id: number, @Body() articleData: Partial<Article>) {
    return this.articleService.update(id, articleData);
  }

  @ApiOperation({ summary: '删除文章' })
  @ApiResponse({ status: 200, description: '删除成功' })
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async remove(@Param('id') id: number) {
    return this.articleService.remove(id);
  }
}
