"use client";

interface MarkdownRendererProps {
  content: string;
}

export default function MarkdownRenderer({ content }: MarkdownRendererProps) {
  // 简单的 Markdown 渲染器
  const renderContent = (text: string) => {
    return (
      text
        // 处理标题
        .replace(
          /^### (.*$)/gim,
          '<h3 class="text-lg font-semibold text-gray-900 mt-6 mb-3">$1</h3>'
        )
        .replace(
          /^## (.*$)/gim,
          '<h2 class="text-xl font-semibold text-gray-900 mt-8 mb-4">$1</h2>'
        )
        .replace(
          /^# (.*$)/gim,
          '<h1 class="text-2xl font-bold text-gray-900 mt-8 mb-4">$1</h1>'
        )

        // 处理代码块
        .replace(
          /```typescript([\s\S]*?)```/g,
          '<pre class="bg-gray-100 rounded-lg p-4 overflow-x-auto my-4"><code class="text-sm">$1</code></pre>'
        )
        .replace(
          /```html([\s\S]*?)```/g,
          '<pre class="bg-gray-100 rounded-lg p-4 overflow-x-auto my-4"><code class="text-sm">$1</code></pre>'
        )
        .replace(
          /```([\s\S]*?)```/g,
          '<pre class="bg-gray-100 rounded-lg p-4 overflow-x-auto my-4"><code class="text-sm">$1</code></pre>'
        )

        // 处理行内代码
        .replace(
          /`([^`]+)`/g,
          '<code class="bg-gray-100 px-2 py-1 rounded text-sm font-mono">$1</code>'
        )

        // 处理段落
        .split("\n\n")
        .map((paragraph) => {
          if (
            paragraph.trim().startsWith("<h") ||
            paragraph.trim().startsWith("<pre")
          ) {
            return paragraph;
          }
          if (paragraph.trim()) {
            return `<p class="mb-4 text-gray-700 leading-relaxed">${paragraph.trim()}</p>`;
          }
          return "";
        })
        .join("")
    );
  };

  return (
    <div
      className="prose prose-gray max-w-none"
      dangerouslySetInnerHTML={{ __html: renderContent(content) }}
    />
  );
}
