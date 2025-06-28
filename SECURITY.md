# Blog with Next.js + NestJS

一个使用Next.js（前端）+ NestJS（后端）+ AWS SAM（基础设施）的全栈博客项目。

## 🚨 安全说明

**本项目包含敏感信息，请在部署前仔细阅读安全配置**

### 环境变量配置

1. **后端环境变量** (backend/.env)
   - 复制 `backend/.env.example` 为 `backend/.env`
   - 填入你的实际数据库连接信息和GitHub Token
   - **注意**: `.env` 文件已被 `.gitignore` 忽略，不会提交到仓库

2. **前端环境变量** (frontend/.env.production)
   - 在Amplify控制台设置环境变量
   - 或创建 `.env.production` 文件（该文件也会被忽略）

### AWS部署

1. **后端部署**: 使用 AWS SAM
   ```bash
   cd infrastructure
   sam build
   sam deploy --guided
   ```

2. **前端部署**: 使用 AWS Amplify
   - 通过Git连接部署（推荐）
   - 或使用静态导出方式

### 敏感信息

以下文件包含敏感信息，已被 `.gitignore` 忽略：
- `backend/.env` - 数据库密码、GitHub Token
- `backend/dist/` - 构建输出
- `.aws-sam/` - SAM构建缓存
- `amplify/team-provider-info.json` - Amplify配置

### GitHub Token权限

GitHub Token需要以下权限：
- `repo` - 访问仓库信息
- `read:user` - 读取用户信息

## 🏗️ 架构

- **前端**: Next.js 15 + TypeScript + Tailwind CSS
- **后端**: NestJS + TypeORM + PostgreSQL
- **数据库**: Aurora PostgreSQL (AWS)
- **基础设施**: AWS SAM (Lambda + API Gateway + VPC)
- **前端托管**: AWS Amplify
