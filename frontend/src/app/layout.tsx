import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import MSWProvider from "@/components/MSWProvider";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Next.js 博客",
  description: "使用 Next.js 构建的学习博客",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh">
      <body className={inter.className}>
        <MSWProvider>
          {/* 网站头部 */}
          <header className="bg-white shadow-sm">
            <div className="max-w-4xl mx-auto px-4 py-4">
              <div className="flex justify-between items-center">
                {/* 左侧标题区域 */}
                <div>
                  <Link
                    href="/"
                    className="hover:text-blue-600 transition-colors"
                  >
                    <h1 className="text-2xl font-bold text-gray-900">
                      Next.js 学习博客
                    </h1>
                  </Link>
                  <p className="text-gray-600 mt-1">学习 Next.js 的实践项目</p>
                </div>

                {/* 右侧导航区域 */}
                <nav className="flex items-center space-x-6">
                  <Link
                    href="/"
                    className="text-gray-700 hover:text-gray-400 transition-colors font-medium"
                  >
                    首页
                  </Link>
                  <Link
                    href="/github"
                    className="text-gray-700 hover:text-gray-400 transition-colors font-medium flex items-center"
                  >
                    GitHub仓库
                  </Link>
                </nav>
              </div>
            </div>
          </header>

          {/* 主要内容区域 */}
          <main className="max-w-4xl mx-auto px-4 py-8">{children}</main>

          {/* 网站底部 */}
          <footer className="bg-white shadow-[0_-1px_3px_rgba(0,0,0,0.15)] mt-16">
            <div className="max-w-4xl mx-auto px-4 py-8 text-center text-gray-600">
              <p>&copy; 2025 Next.js 学习博客. 用于学习目的.</p>
            </div>
          </footer>
        </MSWProvider>
      </body>
    </html>
  );
}
