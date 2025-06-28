// 文章数据类型
export interface Article {
  id: string;
  title: string;
  content: string;
  author: string;
  publishDate: string;
  tags: string[];
  createdAt?: Date;
  updatedAt?: Date;
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

// 创建文章的DTO
export interface CreateArticleDto {
  title: string;
  content: string;
  author: string;
  tags: string[];
  publishDate?: string;
}

// 更新文章的DTO
export interface UpdateArticleDto {
  title?: string;
  content?: string;
  author?: string;
  tags?: string[];
  publishDate?: string;
}

// 查询文章的DTO
export interface QueryArticlesDto {
  page?: number;
  pageSize?: number;
  keyword?: string;
  tag?: string;
}
