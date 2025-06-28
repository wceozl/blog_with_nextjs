import { Module } from '@nestjs/common';
import { GitHubService } from './github.service';
import { GitHubController } from './github.controller';

/**
 * GitHub模块
 * 封装GitHub API相关功能
 */
@Module({
  controllers: [GitHubController],
  providers: [GitHubService],
  exports: [GitHubService], // 导出服务，让其他模块可以使用
})
export class GitHubModule {}
