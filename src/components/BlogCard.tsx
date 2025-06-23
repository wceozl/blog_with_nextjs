import Link from "next/link";
import { Article } from "@/types/blog";

interface BlogCardProps {
  post: Article;
}

export default function BlogCard({ post }: BlogCardProps) {
  return (
    <article className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 overflow-hidden cursor-pointer">
      <Link href={`/posts/${post.id}`}>
        <div className="p-6">
          {/* 文章标题 */}
          <h2 className="text-xl font-semibold text-gray-900 mb-3 transition-colors">
            <Link href={`/posts/${post.id}`}>{post.title}</Link>
          </h2>
          {/* 标签 */}
          <div className="flex flex-wrap gap-2 mb-4">
            {post.tags.map((tag, index) => (
              <span
                key={index}
                className="px-2 py-1 bg-gray-100 text-sm rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>
          {/* 文章信息 */}
          <div className="flex items-center justify-between text-sm text-gray-500">
            <div className="flex items-center space-x-4">
              <span>作者: {post.author}</span>
              <span>{post.publishDate}</span>
            </div>
          </div>
          {/* 阅读更多链接 */}
          {/* <div className="mt-4">
          <Link
            href={`/posts/${post.id}`}
            className="inline-flex items-center text-black-600 hover:text-black-800 font-medium"
          >
            阅读全文
            <svg
              className="ml-1 w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </Link>
        </div> */}
        </div>
      </Link>
    </article>
  );
}
