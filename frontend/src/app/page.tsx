"use client";

import { useEffect, useState } from "react";
import BlogCard from "@/components/BlogCard";
import Loading from "@/components/Loading";
import { blogApi, Article, ApiResponse, ListResponse } from "@/lib/api";

export default function HomePage() {
  const [list, setList] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    async function loadPosts() {
      try {
        setLoading(true);
        setError(null);

        const response: ApiResponse<ListResponse> = await blogApi.getList({
          page: 1,
          pageSize: 10,
        });

        if (response.success) {
          setList(response.data.list);
          setTotal(response.data.total);
        } else {
          setError(response.message || "加载失败");
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : "加载失败");
      } finally {
        setLoading(false);
      }
    }

    loadPosts();
  }, []);

  if (loading) {
    return (
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-8">最新文章</h1>
        <Loading />
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-8">最新文章</h1>
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <p className="text-red-700">加载文章时出错: {error}</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-2 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
          >
            重新加载
          </button>
        </div>
      </div>
    );
  }

  return (
    <div>
      {/* 页面标题 */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">最新文章</h1>
        <p className="text-gray-600">共 {total} 篇文章</p>
      </div>

      {/* 文章列表 */}
      {list.length > 0 ? (
        <div className="space-y-6">
          {list.map((article) => (
            <BlogCard key={article.id} post={article} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">暂时没有文章</p>
        </div>
      )}
    </div>
  );
}
