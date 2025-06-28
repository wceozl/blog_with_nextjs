import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios, { AxiosInstance, AxiosResponse } from 'axios';
import {
  GitHubRepository,
  GitHubUser,
  GitHubCommit,
  GitHubLanguages,
  RepositoryInfo,
  CommitInfo,
  UserRepositoriesResponse,
  UserInfoResponse,
} from './types/github.types';

/**
 * GitHub服务类 - 使用axios直接调用GitHub REST API
 * 完全兼容CommonJS，修复所有TypeScript类型错误
 */
@Injectable()
export class GitHubService {
  private readonly logger = new Logger(GitHubService.name);
  private readonly httpClient: AxiosInstance;
  private readonly username: string;

  constructor(private readonly configService: ConfigService) {
    // 从环境变量获取GitHub配置
    const token = this.configService.get<string>('GITHUB_TOKEN');
    this.username = this.configService.get<string>('GITHUB_USERNAME') || '';

    if (!token) {
      this.logger.warn('GitHub Token未配置，部分功能可能无法使用');
    }

    if (!this.username) {
      this.logger.warn('GitHub用户名未配置');
    }

    // 创建axios实例，配置GitHub API基础设置
    this.httpClient = axios.create({
      baseURL: 'https://api.github.com',
      headers: {
        Authorization: token ? `token ${token}` : '',
        Accept: 'application/vnd.github.v3+json',
        'User-Agent': 'Blog-App-v1.0',
      },
      timeout: 10000, // 10秒超时
    });
  }

  /**
   * 获取用户的所有公开仓库
   */
  async getUserRepositories(): Promise<UserRepositoriesResponse> {
    try {
      this.logger.log(`正在获取用户 ${this.username} 的仓库列表...`);

      // 直接调用GitHub REST API
      const response: AxiosResponse<GitHubRepository[]> =
        await this.httpClient.get(`/users/${this.username}/repos`, {
          params: {
            type: 'owner',
            sort: 'updated',
            direction: 'desc',
            per_page: 30,
          },
        });

      // 格式化返回数据，正确处理类型
      const repositories: RepositoryInfo[] = response.data.map(
        (repo: GitHubRepository) => ({
          id: repo.id,
          name: repo.name,
          full_name: repo.full_name,
          description: repo.description,
          html_url: repo.html_url,
          stargazers_count: repo.stargazers_count,
          forks_count: repo.forks_count,
          language: repo.language,
          created_at: repo.created_at,
          updated_at: repo.updated_at,
          topics: repo.topics || [],
          homepage: repo.homepage,
        }),
      );

      this.logger.log(`成功获取 ${repositories.length} 个仓库`);

      return {
        repositories,
        total: repositories.length,
        username: this.username,
      };
    } catch (error: any) {
      const errorMsg = error instanceof Error ? error.message : String(error);
      this.logger.error('获取GitHub仓库失败:', errorMsg);
      // 如果GitHub API失败，返回空数据而不是抛出错误
      return {
        repositories: [],
        total: 0,
        username: this.username,
        error: `获取GitHub仓库失败: ${errorMsg}`,
      };
    }
  }

  /**
   * 获取特定仓库的详细信息
   */
  async getRepository(repoName: string): Promise<RepositoryInfo> {
    try {
      this.logger.log(
        `正在获取仓库 ${this.username}/${repoName} 的详细信息...`,
      );

      // 并发请求多个API端点，正确指定类型
      const [repoResponse, languagesResponse, commitsResponse]: [
        AxiosResponse<GitHubRepository>,
        AxiosResponse<GitHubLanguages>,
        AxiosResponse<GitHubCommit[]>,
      ] = await Promise.all([
        // 获取仓库基本信息
        this.httpClient.get<GitHubRepository>(
          `/repos/${this.username}/${repoName}`,
        ),
        // 获取语言统计
        this.httpClient.get<GitHubLanguages>(
          `/repos/${this.username}/${repoName}/languages`,
        ),
        // 获取最近提交
        this.httpClient.get<GitHubCommit[]>(
          `/repos/${this.username}/${repoName}/commits`,
          {
            params: { per_page: 5 },
          },
        ),
      ]);

      const repo = repoResponse.data;

      // 安全地处理提交数据
      const recent_commits: CommitInfo[] = commitsResponse.data.map(
        (commit: GitHubCommit) => ({
          sha: commit.sha,
          message: commit.commit.message,
          author: commit.commit.author?.name || 'Unknown',
          date: commit.commit.author?.date || new Date().toISOString(),
        }),
      );

      const repository: RepositoryInfo = {
        id: repo.id,
        name: repo.name,
        full_name: repo.full_name,
        description: repo.description,
        html_url: repo.html_url,
        stargazers_count: repo.stargazers_count,
        forks_count: repo.forks_count,
        language: repo.language,
        created_at: repo.created_at,
        updated_at: repo.updated_at,
        topics: repo.topics || [],
        homepage: repo.homepage,
        size: repo.size,
        default_branch: repo.default_branch,
        open_issues_count: repo.open_issues_count,
        languages: languagesResponse.data,
        recent_commits,
      };

      this.logger.log(`成功获取仓库 ${repoName} 的详细信息`);
      return repository;
    } catch (error: any) {
      const errorMsg = error instanceof Error ? error.message : String(error);
      this.logger.error(`获取仓库 ${repoName} 失败:`, errorMsg);
      throw new Error(`获取仓库失败: ${errorMsg}`);
    }
  }

  /**
   * 获取用户基本信息
   */
  async getUserInfo(): Promise<UserInfoResponse> {
    try {
      this.logger.log(`正在获取用户 ${this.username} 的基本信息...`);

      const response: AxiosResponse<GitHubUser> =
        await this.httpClient.get<GitHubUser>(`/users/${this.username}`);
      const user = response.data;

      return {
        login: user.login,
        id: user.id,
        avatar_url: user.avatar_url,
        html_url: user.html_url,
        name: user.name,
        company: user.company,
        blog: user.blog,
        location: user.location,
        bio: user.bio,
        public_repos: user.public_repos,
        followers: user.followers,
        following: user.following,
        created_at: user.created_at,
      };
    } catch (error: any) {
      const errorMsg = error instanceof Error ? error.message : String(error);
      this.logger.error('获取用户信息失败:', errorMsg);
      // GitHub API失败时返回默认数据
      return {
        login: this.username,
        id: 0,
        avatar_url: '',
        html_url: `https://github.com/${this.username}`,
        name: null,
        company: null,
        blog: '',
        location: null,
        bio: null,
        public_repos: 0,
        followers: 0,
        following: 0,
        created_at: new Date().toISOString(),
        error: `获取用户信息失败: ${errorMsg}`,
      };
    }
  }
}
