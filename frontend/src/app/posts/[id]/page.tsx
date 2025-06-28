"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import BlogDetail from "@/components/BlogDetail";
import { blogApi, Article, ApiResponse } from "@/lib/api";

export default function PostPage() {
  const params = useParams();
  const id = params.id as string;

  const [detail, setDetail] = useState<Article | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadPost() {
      try {
        setLoading(true);
        setError(null);

        const response: ApiResponse<Article> = await blogApi.getDetail(id);

        if (response.success) {
          setDetail(response.data);
        } else {
          setError(response.message || "加载失败");
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : "加载失败");
      } finally {
        setLoading(false);
      }
    }

    if (id) {
      loadPost();
    }
  }, [id]);

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto">
        {/* 详情页加载骨架屏 */}
        <div className="animate-pulse">
          {/* 返回按钮骨架 */}
          <div className="h-6 bg-gray-200 rounded w-32 mb-6"></div>

          {/* 标题骨架 */}
          <div className="h-10 bg-gray-200 rounded w-3/4 mb-4"></div>

          {/* 文章信息骨架 */}
          <div className="flex space-x-4 mb-4">
            <div className="h-5 bg-gray-200 rounded w-20"></div>
            <div className="h-5 bg-gray-200 rounded w-24"></div>
            <div className="h-5 bg-gray-200 rounded w-16"></div>
          </div>

          {/* 标签骨架 */}
          <div className="flex space-x-2 mb-8">
            <div className="h-6 bg-gray-200 rounded-full w-16"></div>
            <div className="h-6 bg-gray-200 rounded-full w-20"></div>
          </div>

          {/* 内容骨架 */}
          <div className="space-y-4">
            <div className="h-4 bg-gray-200 rounded w-full"></div>
            <div className="h-4 bg-gray-200 rounded w-5/6"></div>
            <div className="h-4 bg-gray-200 rounded w-4/5"></div>
            <div className="h-4 bg-gray-200 rounded w-full"></div>
            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-4xl mx-auto">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6">
          <h2 className="text-lg font-semibold text-red-800 mb-2">
            加载文章失败
          </h2>
          <p className="text-red-700 mb-4">{error}</p>
          <div className="flex space-x-3">
            <button
              onClick={() => window.location.reload()}
              className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
            >
              重新加载
            </button>
            <button
              onClick={() => window.history.back()}
              className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700 transition-colors"
            >
              返回上一页
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (!detail) {
    return (
      <div className="max-w-4xl mx-auto text-center py-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">文章未找到</h2>
        <p className="text-gray-600 mb-6">
          抱歉，您访问的文章不存在或已被删除。
        </p>
        <button
          onClick={() => window.history.back()}
          className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          返回上一页
        </button>
      </div>
    );
  }

  return <BlogDetail detail={detail} />;
}
