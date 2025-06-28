"use client";

import { useState, useEffect } from "react";
import {
  githubApi,
  GitHubRepository,
  ApiResponse,
  GitHubResponse,
} from "../../lib/api";
import Loading from "../../components/Loading";

export default function GitHubPage() {
  const [repositories, setRepositories] = useState<GitHubRepository[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRepositories = async () => {
      try {
        setLoading(true);
        setError(null);
        const response: ApiResponse<GitHubResponse> =
          await githubApi.getRepositories();

        if (response.success) {
          setRepositories(response.data.repositories);
        } else {
          setError(response.message || "获取项目列表失败");
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : "网络错误，请稍后重试");
      } finally {
        setLoading(false);
      }
    };

    fetchRepositories();
  }, []);

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-red-600 mb-4">加载失败</h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            重新加载
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">
          GitHub 项目列表
        </h1>

        {repositories.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500">暂无项目</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {repositories.map((repo) => (
              <div
                key={repo.id}
                className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
              >
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  <a
                    href={repo.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-gray-400 transition-colors"
                  >
                    {repo.name}
                  </a>
                </h3>

                <p className="text-gray-600 mb-4 text-sm line-clamp-3">
                  {repo.description || "暂无描述"}
                </p>

                <div className="flex items-center justify-between text-sm text-gray-500">
                  <div className="flex items-center space-x-4">
                    {repo.language && (
                      <span className="flex items-center">
                        <span className="w-3 h-3 rounded-full bg-blue-500 mr-1"></span>
                        {repo.language}
                      </span>
                    )}
                    <span className="flex items-center">
                      ⭐ {repo.stargazers_count}
                    </span>
                    <span className="flex items-center">
                      🍴 {repo.forks_count}
                    </span>
                  </div>
                </div>

                <div className="mt-4 text-xs text-gray-400">
                  更新于:{" "}
                  {new Date(repo.updated_at).toLocaleDateString("zh-CN")}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
