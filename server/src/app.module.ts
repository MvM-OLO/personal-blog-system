import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';

import { User } from './modules/user/user.entity';
import { UserModule } from './modules/user/user.module';
import { AuthModule } from './modules/auth/auth.module';
import { Article } from './modules/article/article.entity';
import { ArticleModule } from './modules/article/article.module';
import { MenuModule } from './modules/menu/menu.module';
import { Menu } from './modules/menu/menu.entity';
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '123456',
      database: 'test',
      entities: [User, Article, Menu],
      synchronize: true,
    }),
    UserModule,
    AuthModule,
    ArticleModule,
    MenuModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
