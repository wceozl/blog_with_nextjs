export default function Loading() {
  return (
    <div className="space-y-6">
      {/* 模拟博客卡片的骨架屏 */}
      {[1, 2, 3].map((item) => (
        <div
          key={item}
          className="bg-white rounded-lg shadow-md p-6 animate-pulse"
        >
          {/* 标题骨架 */}
          <div className="h-6 bg-gray-200 rounded w-3/4 mb-3"></div>

          {/* 摘要骨架 */}
          <div className="space-y-2 mb-4">
            <div className="h-4 bg-gray-200 rounded w-full"></div>
            <div className="h-4 bg-gray-200 rounded w-5/6"></div>
            <div className="h-4 bg-gray-200 rounded w-2/3"></div>
          </div>

          {/* 标签骨架 */}
          <div className="flex space-x-2 mb-4">
            <div className="h-6 bg-gray-200 rounded-full w-16"></div>
            <div className="h-6 bg-gray-200 rounded-full w-20"></div>
            <div className="h-6 bg-gray-200 rounded-full w-12"></div>
          </div>

          {/* 文章信息骨架 */}
          <div className="flex justify-between">
            <div className="h-4 bg-gray-200 rounded w-32"></div>
            <div className="h-4 bg-gray-200 rounded w-20"></div>
          </div>
        </div>
      ))}
    </div>
  );
}
