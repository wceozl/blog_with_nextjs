/**
 * 创建文章的数据传输对象
 * 定义了创建文章时客户端需要提供的数据格式
 */
export class CreateArticleDto {
  /**
   * 文章标题 - 必填
   */
  title: string;

  /**
   * 文章内容 - 必填
   */
  content: string;

  /**
   * 文章作者 - 必填
   */
  author: string;

  /**
   * 文章标签 - 必填，字符串数组
   */
  tags: string[];

  /**
   * 发布日期 - 可选，如果不提供则使用当前日期
   */
  publishDate?: string;
}
