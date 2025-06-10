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
  Patch,
} from '@nestjs/common';
import { MenuService } from './menu.service';
import { Menu } from './menu.entity';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';

@ApiTags('菜单')
@ApiBearerAuth()
@Controller('menu')
export class MenuController {
  constructor(private readonly menuService: MenuService) {}

  @ApiOperation({ summary: '创建菜单' })
  @ApiResponse({ status: 201, description: '创建成功' })
  @UseGuards(JwtAuthGuard)
  @Post('/add')
  async create(@Body() menuData: Partial<Menu>) {
    return this.menuService.create(menuData);
  }

  @ApiOperation({ summary: '获取所有菜单' })
  @ApiResponse({ status: 200, description: '获取成功' })
  @Get('/all')
  async findAll() {
    return this.menuService.findAll();
  }

  @ApiOperation({ summary: '获取菜单详情' })
  @ApiResponse({ status: 200, description: '获取成功' })
  @Get(':id')
  async findOne(@Param('id') id: number) {
    return this.menuService.findOne(id);
  }

  @ApiOperation({ summary: '更新菜单' })
  @ApiResponse({ status: 200, description: '更新成功' })
  @UseGuards(JwtAuthGuard)
  @Put(':id')
  async update(@Body() menuData: Partial<Menu>) {
    return this.menuService.update(menuData);
  }

  @ApiOperation({ summary: '删除菜单' })
  @ApiResponse({ status: 200, description: '删除成功' })
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async remove(@Param('id') id: number) {
    return this.menuService.remove(id);
  }

  @ApiOperation({ summary: '调整菜单排序' })
  @ApiResponse({ status: 200, description: '排序调整成功' })
  @UseGuards(JwtAuthGuard)
  @Patch('sort')
  async updateSort(@Body() sortData: { id: number; sort: number }[]) {
    return this.menuService.updateSort(sortData);
  }
}
