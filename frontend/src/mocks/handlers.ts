import { http, HttpResponse } from "msw";
import { findArticleById, getPaginated } from "./data";
import { ListResponse, DetailResponse } from "@/types/blog";

export const handlers = [
  // 博客列表
  http.get("/api/posts", ({ request }) => {
    const url = new URL(request.url);
    const page = parseInt(url.searchParams.get("page") || "1");
    const pageSize = parseInt(url.searchParams.get("pageSize") || "10");
    const result = getPaginated(page, pageSize);
    const response: ListResponse = {
      list: result.posts,
      total: result.total,
      page: result.page,
      pageSize: result.pageSize,
    };
    // 模拟网络延迟
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(HttpResponse.json(response));
      }, 300);
    });
  }),

  // 博客详情
  http.get("/api/posts/:id", ({ params }) => {
    const { id } = params;
    const detail = findArticleById(id as string);
    if (!detail) {
      return HttpResponse.json({ error: "Post not found" }, { status: 404 });
    }
    const response: DetailResponse = {
      detail,
    };
    // 模拟网络延迟
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(HttpResponse.json(response));
      }, 300);
    });
  }),
];
