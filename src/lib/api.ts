import { ListResponse, DetailResponse } from "@/types/blog";

// 基础 API URL
const API_BASE = "";

// 获取博客列表
export async function fetchPosts(
  page: number = 1,
  pageSize: number = 10
): Promise<ListResponse> {
  const response = await fetch(
    `${API_BASE}/api/posts?page=${page}&pageSize=${pageSize}`
  );

  if (!response.ok) {
    throw new Error("获取博客列表失败");
  }

  return response.json();
}

// 获取博客详情
export async function fetchPost(id: string): Promise<DetailResponse> {
  const response = await fetch(`${API_BASE}/api/posts/${id}`);

  if (!response.ok) {
    if (response.status === 404) {
      throw new Error("博客文章未找到");
    }
    throw new Error("获取博客详情失败");
  }

  return response.json();
}
