// 文章数据类型
export interface Article {
  id: string;
  title: string;
  content: string;
  author: string;
  publishDate: string;
  tags: string[];
}

// API 响应类型
export interface ListResponse {
  list: Article[];
  total: number;
  page: number;
  pageSize: number;
}

export interface DetailResponse {
  detail: Article;
}
