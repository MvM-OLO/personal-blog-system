import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('menus')
export class Menu {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  name: string;

  @Column({ length: 200, nullable: true })
  path: string;

  @Column({ length: 100, nullable: true })
  icon: string;

  @Column({ nullable: true })
  parentId: number;

  @Column({ default: 0 })
  sort: number;

  @Column({ default: true })
  isVisible: boolean;

  @Column({ length: 200 })
  component: string;

  @Column({ length: 100, nullable: true })
  permission: string;

  @Column('json', { nullable: true })
  meta: {
    title?: string;
    icon?: string;
    hidden?: boolean;
    roles?: string[];
    keepAlive?: boolean;
    [key: string]: any;
  };

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
