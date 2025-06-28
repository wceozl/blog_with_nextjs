import { Article } from "@/types/blog";

// 模拟博客数据
export const mockList: Article[] = [
  {
    id: "1",
    title: "Next.js 入门指南",
    content: `Next.js 是一个基于 React 的全栈框架，它提供了许多开箱即用的功能。

## 主要特性

### 1. 服务端渲染 (SSR)
Next.js 支持服务端渲染，可以提高首屏加载速度和 SEO 效果。

### 2. 静态站点生成 (SSG)
可以在构建时生成静态页面，适合内容不经常变化的网站。

### 3. App Router
新的路由系统基于文件系统，更加直观和强大。

### 4. API Routes
可以在同一个项目中创建 API 端点。

这些特性使得 Next.js 成为现代 Web 开发的优秀选择。`,
    author: "张三",
    publishDate: "2025-01-01",
    tags: ["Next.js", "React", "前端"],
  },
  {
    id: "2",
    title: "TypeScript 在 React 中的应用",
    content: `TypeScript 为 React 开发带来了类型安全和更好的开发体验。

## 为什么使用 TypeScript

### 1. 类型安全
编译时捕获错误，减少运行时问题。

### 2. 更好的 IDE 支持
智能提示、自动补全、重构等功能。

### 3. 代码可维护性
类型定义作为文档，提高代码可读性。

## 在 React 中的使用

### 组件 Props 类型定义
\`\`\`typescript
interface Props {
  title: string;
  count: number;
}

const MyComponent: React.FC<Props> = ({ title, count }) => {
  return <div>{title}: {count}</div>;
};
\`\`\`

### 状态类型定义
\`\`\`typescript
const [user, setUser] = useState<User | null>(null);
\`\`\`

TypeScript 让 React 开发更加可靠和高效。`,
    author: "李四",
    publishDate: "2025-01-01",
    tags: ["TypeScript", "React", "前端"],
  },
  {
    id: "3",
    title: "Tailwind CSS 实用技巧",
    content: `Tailwind CSS 是一个功能类优先的 CSS 框架，让样式开发更加高效。

## 核心概念

### 1. 功能类优先
直接在 HTML 中使用预定义的 CSS 类。

### 2. 响应式设计
使用前缀轻松实现响应式布局。

### 3. 状态变体
支持 hover、focus 等状态的样式。

## 常用技巧

### 布局
- \`flex\`, \`grid\` - 布局方式
- \`justify-center\`, \`items-center\` - 对齐
- \`space-x-4\`, \`space-y-2\` - 间距

### 响应式
\`\`\`html
<div class="w-full md:w-1/2 lg:w-1/3">
  <!-- 不同屏幕尺寸下的宽度 -->
</div>
\`\`\`

### 自定义配置
可以通过 \`tailwind.config.js\` 扩展默认配置。

Tailwind CSS 让样式开发变得简单而强大。`,
    author: "王五",
    publishDate: "2025-01-01",
    tags: ["Tailwind CSS", "CSS", "前端"],
  },
];

// 根据 ID 查找文章
export const findArticleById = (id: string): Article | undefined => {
  return mockList.find((article) => article.id === id);
};

// 分页获取文章
export const getPaginated = (page: number = 1, pageSize: number = 10) => {
  const startIndex = (page - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const posts = mockList.slice(startIndex, endIndex);

  return {
    posts,
    total: mockList.length,
    page,
    pageSize,
  };
};
