import { Controller, Get, Param } from '@nestjs/common';
import { GitHubService } from './github.service';

/**
 * GitHub控制器
 * 处理GitHub相关的API请求
 */
@Controller('github')
export class GitHubController {
  constructor(private readonly githubService: GitHubService) {}

  /**
   * 获取用户信息
   * GET /api/github/user
   */
  @Get('user')
  async getUserInfo() {
    try {
      const userInfo = await this.githubService.getUserInfo();
      return {
        success: true,
        message: '获取用户信息成功',
        data: userInfo,
      };
    } catch (error) {
      const errorMsg = error instanceof Error ? error.message : String(error);
      return {
        success: false,
        message: errorMsg,
        data: null,
      };
    }
  }

  /**
   * 获取用户的所有仓库
   * GET /api/github/repositories
   */
  @Get('repositories')
  async getUserRepositories() {
    try {
      const result = await this.githubService.getUserRepositories();
      return {
        success: true,
        message: '获取仓库列表成功',
        data: result,
      };
    } catch (error) {
      const errorMsg = error instanceof Error ? error.message : String(error);
      return {
        success: false,
        message: errorMsg,
        data: null,
      };
    }
  }

  /**
   * 获取特定仓库的详细信息
   * GET /api/github/repository/:name
   * @param name 仓库名称
   */
  @Get('repository/:name')
  async getRepository(@Param('name') name: string) {
    try {
      const repository = await this.githubService.getRepository(name);
      return {
        success: true,
        message: '获取仓库信息成功',
        data: repository,
      };
    } catch (error) {
      const errorMsg = error instanceof Error ? error.message : String(error);
      return {
        success: false,
        message: errorMsg,
        data: null,
      };
    }
  }

  /**
   * 获取当前项目仓库信息（特殊接口）
   * GET /api/github/current-project
   * 返回blog_with_nextjs仓库的信息
   */
  @Get('current-project')
  async getCurrentProject() {
    try {
      // 假设你的仓库名是blog_with_nextjs，根据实际情况修改
      const repository =
        await this.githubService.getRepository('blog_with_nextjs');
      return {
        success: true,
        message: '获取当前项目信息成功',
        data: repository,
      };
    } catch (error) {
      const errorMsg = error instanceof Error ? error.message : String(error);
      return {
        success: false,
        message: errorMsg,
        data: null,
      };
    }
  }
}
