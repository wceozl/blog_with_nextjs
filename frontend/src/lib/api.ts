// 从shared文件夹引入类型定义
import {
  Article,
  ListResponse,
  DetailResponse,
  CreateArticleDto,
  QueryArticlesDto,
  GitHubRepository,
  GitHubResponse,
} from "../../../shared/src";

// API配置
const API_BASE_URL =
  "https://1so6f6g8vl.execute-api.us-east-1.amazonaws.com/Prod/api";
// API响应的通用格式
interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

// 文章相关API
export const blogApi = {
  // 获取文章列表
  getList: async (
    params?: QueryArticlesDto
  ): Promise<ApiResponse<ListResponse>> => {
    const searchParams = new URLSearchParams();
    if (params?.page) searchParams.append("page", params.page.toString());
    if (params?.pageSize)
      searchParams.append("pageSize", params.pageSize.toString());
    if (params?.keyword) searchParams.append("keyword", params.keyword);
    if (params?.tag) searchParams.append("tag", params.tag);

    const url = `${API_BASE_URL}/blog${searchParams.toString() ? "?" + searchParams.toString() : ""}`;
    const response = await fetch(url, {
      credentials: 'include',
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  },

  // 获取文章详情
  getDetail: async (id: string): Promise<ApiResponse<Article>> => {
    const response = await fetch(`${API_BASE_URL}/blog/${id}`, {
      credentials: 'include',
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  },

  // 创建文章
  create: async (data: CreateArticleDto): Promise<ApiResponse<Article>> => {
    const response = await fetch(`${API_BASE_URL}/blog`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: 'include',
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  },

  // 更新文章
  update: async (
    id: string,
    data: Partial<CreateArticleDto>
  ): Promise<ApiResponse<Article>> => {
    const response = await fetch(`${API_BASE_URL}/blog/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: 'include',
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  },

  // 删除文章
  delete: async (id: string): Promise<ApiResponse<null>> => {
    const response = await fetch(`${API_BASE_URL}/blog/${id}`, {
      method: "DELETE",
      credentials: 'include',
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  },
};

// GitHub用户信息类型
interface GitHubUser {
  login: string;
  id: number;
  avatar_url: string;
  html_url: string;
  name: string | null;
  company: string | null;
  blog: string;
  location: string | null;
  bio: string | null;
  public_repos: number;
  followers: number;
  following: number;
  created_at: string;
}

// GitHub相关API
export const githubApi = {
  // 获取用户信息
  getUser: async (): Promise<ApiResponse<GitHubUser>> => {
    const response = await fetch(`${API_BASE_URL}/github/user`, {
      credentials: 'include',
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  },

  // 获取仓库列表
  getRepositories: async (): Promise<ApiResponse<GitHubResponse>> => {
    const response = await fetch(`${API_BASE_URL}/github/repositories`, {
      credentials: 'include',
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  },

  // 获取当前项目信息
  getCurrentProject: async (): Promise<ApiResponse<GitHubRepository>> => {
    const response = await fetch(`${API_BASE_URL}/github/current-project`, {
      credentials: 'include',
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  },
};

// 导出类型供其他文件使用
export type {
  Article,
  ListResponse,
  DetailResponse,
  CreateArticleDto,
  QueryArticlesDto,
  GitHubRepository,
  GitHubResponse,
  GitHubUser,
  ApiResponse,
};
