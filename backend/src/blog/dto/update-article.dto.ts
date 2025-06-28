/**
 * 更新文章的数据传输对象
 * 所有字段都是可选的，只更新提供的字段
 */
export class UpdateArticleDto {
  /**
   * 文章标题 - 可选
   */
  title?: string;

  /**
   * 文章内容 - 可选
   */
  content?: string;

  /**
   * 文章作者 - 可选
   */
  author?: string;

  /**
   * 文章标签 - 可选
   */
  tags?: string[];

  /**
   * 发布日期 - 可选
   */
  publishDate?: string;
}
