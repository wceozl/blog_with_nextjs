"use client";

import { useEffect, useState } from "react";
interface MSWProviderProps {
  children: React.ReactNode;
}

export default function MSWProvider({ children }: MSWProviderProps) {
  const [isReady, setIsReady] = useState(false);
  useEffect(() => {
    // 只在浏览器环境中启动 MSW
    if (typeof window !== "undefined") {
      import("@/mocks/browser").then(async ({ worker }) => {
        await worker.start({
          onUnhandledRequest: "bypass", // 忽略未处理的请求
        });
        setIsReady(true);
      });
    }
  }, []);
  // 在 MSW 准备好之前显示加载状态
  if (!isReady) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-lg">正在初始化...</div>
      </div>
    );
  }
  return <>{children}</>;
}
