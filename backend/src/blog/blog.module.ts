import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BlogController } from './blog.controller';
import { BlogService } from './blog.service';
import { Article } from '../entities/article.entity';

/**
 * 博客模块
 * @Module() 装饰器定义了模块的组成部分
 */
@Module({
  imports: [
    /**
     * TypeOrmModule.forFeature([Article])
     * 导入Article实体，使得这个模块可以使用Article的Repository
     */
    TypeOrmModule.forFeature([Article]),
  ],
  controllers: [BlogController], // 注册控制器
  providers: [BlogService], // 注册服务
  exports: [BlogService], // 导出服务，让其他模块可以使用
})
export class BlogModule {}
