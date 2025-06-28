import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

/**
 * Article实体类 - 对应数据库中的articles表
 * @Entity() 装饰器告诉TypeORM这个类是一个数据库实体
 */
@Entity('articles') // 指定表名为articles
export class Article {
  /**
   * 主键ID - 自动生成的UUID
   * @PrimaryGeneratedColumn('uuid') 创建一个UUID类型的主键
   */
  @PrimaryGeneratedColumn('uuid')
  id: string;

  /**
   * 文章标题
   * @Column() 装饰器定义数据库字段
   * length: 200 限制标题长度不超过200字符
   */
  @Column({ length: 200 })
  title: string;

  /**
   * 文章内容
   * type: 'text' 表示这是一个长文本字段，可以存储大量内容
   */
  @Column({ type: 'text' })
  content: string;

  /**
   * 文章作者
   * length: 100 限制作者名长度
   */
  @Column({ length: 100 })
  author: string;

  /**
   * 发布日期
   * type: 'date' 只存储日期，不包含时间
   */
  @Column({ type: 'date' })
  publishDate: string;

  /**
   * 文章标签
   * type: 'simple-array' 将数组存储为逗号分隔的字符串
   * 例如: ['Next.js', 'React'] 会存储为 'Next.js,React'
   */
  @Column({ type: 'simple-array' })
  tags: string[];

  /**
   * 创建时间 - 自动设置
   * @CreateDateColumn() 在记录创建时自动设置当前时间
   */
  @CreateDateColumn()
  createdAt: Date;

  /**
   * 更新时间 - 自动更新
   * @UpdateDateColumn() 在记录更新时自动设置当前时间
   */
  @UpdateDateColumn()
  updatedAt: Date;
}
