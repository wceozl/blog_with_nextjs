/**
 * 查询文章列表的参数对象
 * 用于分页和筛选
 */
export class QueryArticlesDto {
  /**
   * 页码 - 默认为1
   */
  page?: number = 1;

  /**
   * 每页数量 - 默认为10
   */
  pageSize?: number = 10;

  /**
   * 搜索关键词 - 可选
   * 会在标题和内容中搜索
   */
  keyword?: string;

  /**
   * 标签筛选 - 可选
   */
  tag?: string;
}
