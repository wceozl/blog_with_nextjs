import Link from "next/link";

export default function NotFound() {
  return (
    <div className="text-center py-16">
      <div className="max-w-md mx-auto">
        {/* 404 图标 */}
        <div className="text-6xl text-gray-400 mb-4">🔍</div>

        <h1 className="text-4xl font-bold text-gray-900 mb-4">404</h1>

        <h2 className="text-xl font-semibold text-gray-700 mb-4">页面未找到</h2>

        <p className="text-gray-600 mb-8">
          抱歉，您访问的页面不存在。可能是链接错误或页面已被移动。
        </p>

        {/* 操作按钮 */}
        <div className="space-y-3">
          <Link
            href="/"
            className="block w-full px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
          >
            返回首页
          </Link>

          <button
            onClick={() => window.history.back()}
            className="block w-full px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors font-medium"
          >
            返回上一页
          </button>
        </div>
      </div>
    </div>
  );
}
