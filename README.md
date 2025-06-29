# 全栈博客应用

基于 Next.js 和 NestJS 构建的现代化无服务器全栈博客应用，部署在 AWS 上。

## 🚀 在线演示

- **前端**: [https://main.danec3gznhndc.amplifyapp.com](https://main.danec3gznhndc.amplifyapp.com)
- **API**: [https://1so6f6g8vl.execute-api.us-east-1.amazonaws.com/Prod](https://1so6f6g8vl.execute-api.us-east-1.amazonaws.com/Prod)

## 📋 主要功能

- **现代化界面**: 基于 Tailwind CSS 的清爽响应式设计
- **丰富内容**: 支持 Markdown 格式的博客文章
- **GitHub 集成**: 展示 GitHub 仓库和用户信息
- **无服务器架构**: 成本低廉、自动扩缩容的基础设施
- **类型安全**: 前后端全面的 TypeScript 支持
- **高性能**: 快速加载，优化缓存策略

## 🛠 技术栈

### 前端
- **框架**: Next.js 15.3.4 with App Router
- **样式**: Tailwind CSS 3.4.15
- **语言**: TypeScript 5
- **部署**: AWS Amplify CI/CD

### 后端
- **框架**: NestJS 11.0.1
- **数据库**: PostgreSQL + TypeORM 0.3.25
- **运行时**: AWS Lambda Node.js 18
- **API 网关**: AWS API Gateway REST API

### 基础设施
- **基础设施即代码**: AWS SAM (Serverless Application Model)
- **数据库**: Aurora PostgreSQL Serverless v2
- **网络**: VPC 公有/私有子网
- **监控**: CloudWatch 日志

### 开发工具
- **包管理器**: npm
- **代码检查**: ESLint + Prettier
- **测试**: Jest
- **构建**: TypeScript 编译器 + SWC

## 📁 项目结构

```
├── frontend/                 # Next.js 前端应用
│   ├── src/
│   │   ├── app/             # App Router 页面
│   │   ├── components/      # 可复用 UI 组件
│   │   ├── lib/            # API 客户端和工具函数
│   │   └── types/          # TypeScript 类型定义
│   ├── public/             # 静态资源
│   ├── tailwind.config.js  # Tailwind 配置
│   └── package.json
│
├── backend/                  # NestJS 后端 API
│   ├── src/
│   │   ├── blog/           # 博客模块 (控制器、服务)
│   │   ├── github/         # GitHub 集成模块
│   │   ├── entities/       # TypeORM 实体
│   │   ├── lambda.ts       # AWS Lambda 处理程序
│   │   └── main.ts         # 本地开发入口
│   └── package.json
│
├── infrastructure/          # AWS SAM 模板
│   ├── template.yaml       # CloudFormation 模板
│   └── samconfig.toml     # SAM 部署配置
│
├── shared/                 # 共享 TypeScript 类型
│   └── src/
│       └── index.ts       # 通用接口和类型
│
└── amplify.yml            # AWS Amplify 构建配置
```

## 🚦 快速开始

### 环境要求

- Node.js 18+ 和 npm
- 配置好权限的 AWS CLI
- AWS SAM CLI
- PostgreSQL (本地开发用)

### 本地开发

1. **克隆仓库**
   ```bash
   git clone <repository-url>
   cd blog_with_nextjs
   ```

2. **安装依赖**
   ```bash
   # 安装根目录依赖
   npm install
   
   # 安装前端依赖
   cd frontend && npm install && cd ..
   
   # 安装后端依赖
   cd backend && npm install && cd ..
   ```

3. **设置环境变量**
   ```bash
   # 后端环境变量
   cd backend
   cp .env.example .env
   # 编辑 .env 文件，填入数据库凭据和 GitHub token
   ```

4. **启动开发服务器**
   ```bash
   # 终端 1: 启动后端
   cd backend && npm run start:dev
   
   # 终端 2: 启动前端
   cd frontend && npm run dev
   ```

5. **访问应用**
   - 前端: [http://localhost:3000](http://localhost:3000)
   - 后端 API: [http://localhost:3001/api](http://localhost:3001/api)

## 🏗️ 部署指南

### 后端部署 (AWS Lambda + RDS)

1. **准备后端构建**
   ```bash
   cd backend
   npm run clean:lambda
   npm run build:lambda
   ```

2. **部署基础设施**
   ```bash
   cd infrastructure
   sam build
   sam deploy --guided  # 仅第一次部署使用
   # 后续部署使用：
   sam deploy
   ```

3. **更新环境变量**
   - 在 AWS Parameter Store 或 SAM 模板中设置数据库凭据
   - 配置 GitHub token 用于 API 集成

### 前端部署 (AWS Amplify)

1. **连接仓库到 Amplify**
   - 前往 AWS Amplify 控制台
   - 连接你的 GitHub 仓库
   - 选择 `main` 分支

2. **配置构建设置**
   - `amplify.yml` 文件已经配置好
   - 推送代码时会自动运行构建命令

3. **部署**
   ```bash
   git add .
   git commit -m "部署到生产环境"
   git push origin main
   ```

## 🔧 环境变量

### 后端 (.env)
```env
# 数据库
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=your_password
DB_DATABASE=blog_db

# GitHub 集成
GITHUB_TOKEN=your_github_token
GITHUB_USERNAME=your_github_username

# 环境
NODE_ENV=development
```

### 前端
基础设置无需环境变量。API URL 在 `src/lib/api.ts` 中配置。

## 📚 API 文档

### 博客接口
- `GET /api/blog` - 获取分页博客文章
- `GET /api/blog/:id` - 获取指定博客文章
- `POST /api/blog` - 创建新博客文章
- `PUT /api/blog/:id` - 更新博客文章
- `DELETE /api/blog/:id` - 删除博客文章

### GitHub 接口
- `GET /api/github/user` - 获取 GitHub 用户信息
- `GET /api/github/repositories` - 获取用户仓库
- `GET /api/github/current-project` - 获取当前项目信息

### 查询参数
```typescript
// 博客列表查询
interface QueryArticlesDto {
  page?: number;
  pageSize?: number;
  keyword?: string;
  tag?: string;
}
```

## 🐛 故障排除

### 常见问题

**1. CORS 错误**
- 确保前端域名已添加到后端 CORS 配置中
- 检查 API Gateway CORS 配置是否正确

**2. Lambda 冷启动**
- 生产环境考虑使用预配置并发
- 通过排除不必要的依赖来优化包大小

**3. 数据库连接问题**
- 验证 VPC 和安全组配置
- 检查 Aurora 集群是否在正确的可用区

**4. 构建失败**
- 确保所有依赖已安装: `npm run build:lambda`
- 检查后端的 TypeScript 编译错误

**5. 502 网关错误**
- 查看 CloudWatch 日志中的 Lambda 函数错误
- 验证 Lambda 函数响应格式
- 确保所有必需的依赖都已打包

### 实用命令

```bash
# 查看 Lambda 日志
sam logs --name BlogApiFunction --stack-name blog-fullstack-dev --tail

# 本地测试 Lambda 函数
sam local start-api --port 3001

# 检查前端构建
cd frontend && npm run build

# 验证 SAM 模板
sam validate --template template.yaml
```