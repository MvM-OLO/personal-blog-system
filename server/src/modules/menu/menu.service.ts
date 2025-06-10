import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Menu } from './menu.entity';

@Injectable()
export class MenuService {
  constructor(
    @InjectRepository(Menu)
    private menuRepository: Repository<Menu>,
  ) {}

  async create(menuData: Partial<Menu>): Promise<Menu> {
    const menu = this.menuRepository.create(menuData);
    return this.menuRepository.save(menu);
  }

  async findAll(): Promise<Menu[]> {
    return this.menuRepository.find();
  }

  async findOne(id: number): Promise<Menu> {
    return this.menuRepository.findOne({
      where: { id },
    });
  }

  async update(menuData: Partial<Menu>): Promise<Menu> {
    await this.menuRepository.update(menuData.id, menuData);
    return this.findOne(menuData.id);
  }

  async remove(id: number): Promise<void> {
    await this.menuRepository.delete(id);
  }

  async updateSort(sortData: { id: number; sort: number }[]): Promise<void> {
    // 使用事务来确保所有排序更新要么全部成功，要么全部失败
    await this.menuRepository.manager.transaction(async (manager) => {
      for (const item of sortData) {
        await manager.update(Menu, item.id, { sort: item.sort });
      }
    });
  }
}
