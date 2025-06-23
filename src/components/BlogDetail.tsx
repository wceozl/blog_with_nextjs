import Link from "next/link";
import { Article } from "@/types/blog";
import MarkdownRender from "./MarkdownRender";

interface PostDetailProps {
  detail: Article;
}

export default function PostDetail({ detail }: PostDetailProps) {
  return (
    <article className="max-w-4xl mx-auto">
      {/* 返回按钮 */}
      <div className="mb-6">
        <Link
          href="/"
          className="inline-flex items-center text-black-600 hover:text-black-800 font-medium"
        >
          <svg
            className="mr-2 w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
          返回文章列表
        </Link>
      </div>

      {/* 文章头部 */}
      <header className="mb-8 pb-8 border-b border-gray-200">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          {detail.title}
        </h1>

        {/* 文章信息 */}
        <div className="flex flex-wrap items-center gap-4 text-gray-600 mb-4">
          <span className="flex items-center">
            <svg
              className="mr-1 w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
              />
            </svg>
            {detail.author}
          </span>

          <span className="flex items-center">
            <svg
              className="mr-1 w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
            {detail.publishDate}
          </span>

          <span className="flex items-center">
            <svg
              className="mr-1 w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </span>
        </div>

        {/* 标签 */}
        <div className="flex flex-wrap gap-2">
          {detail.tags.map((tag, index) => (
            <span
              key={index}
              className="px-3 py-1 bg-gray-100 text-black-800 text-sm rounded-full font-medium"
            >
              {tag}
            </span>
          ))}
        </div>
      </header>

      {/* 文章内容 */}
      <div className="prose prose-lg max-w-none">
        <MarkdownRender content={detail.content} />
      </div>

      {/* 文章底部 */}
      <footer className="mt-12 pt-8 border-t border-gray-200">
        <div className="bg-gray-50 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">关于作者</h3>
          <p className="text-gray-600">
            {detail.author} - 专注于前端技术分享和实践
          </p>
        </div>

        {/* 返回按钮 */}
        <div className="mt-6 text-center">
          <Link
            href="/"
            className="inline-flex items-center px-6 py-3 rounded-lg transition-colors font-medium"
          >
            <svg
              className="mr-2 w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
            返回文章列表
          </Link>
        </div>
      </footer>
    </article>
  );
}
