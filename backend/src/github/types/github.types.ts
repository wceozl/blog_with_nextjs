/**
 * GitHub API响应类型定义
 */

// GitHub仓库类型
export interface GitHubRepository {
  id: number;
  name: string;
  full_name: string;
  description: string | null;
  html_url: string;
  stargazers_count: number;
  forks_count: number;
  language: string | null;
  created_at: string;
  updated_at: string;
  topics?: string[];
  homepage: string | null;
  size?: number;
  default_branch?: string;
  open_issues_count?: number;
}

// GitHub用户类型
export interface GitHubUser {
  login: string;
  id: number;
  avatar_url: string;
  html_url: string;
  name: string | null;
  company: string | null;
  blog: string;
  location: string | null;
  bio: string | null;
  public_repos: number;
  followers: number;
  following: number;
  created_at: string;
}

// GitHub提交类型
export interface GitHubCommit {
  sha: string;
  commit: {
    message: string;
    author: {
      name: string;
      date: string;
    } | null;
  };
}

// GitHub语言统计类型
export interface GitHubLanguages {
  [language: string]: number;
}

// 我们的API响应类型
export interface RepositoryInfo {
  id: number;
  name: string;
  full_name: string;
  description: string | null;
  html_url: string;
  stargazers_count: number;
  forks_count: number;
  language: string | null;
  created_at: string;
  updated_at: string;
  topics: string[];
  homepage: string | null;
  size?: number;
  default_branch?: string;
  open_issues_count?: number;
  languages?: GitHubLanguages;
  recent_commits?: CommitInfo[];
}

export interface CommitInfo {
  sha: string;
  message: string;
  author: string;
  date: string;
}

export interface UserRepositoriesResponse {
  repositories: RepositoryInfo[];
  total: number;
  username: string;
  error?: string;
}

export interface UserInfoResponse {
  login: string;
  id: number;
  avatar_url: string;
  html_url: string;
  name: string | null;
  company: string | null;
  blog: string;
  location: string | null;
  bio: string | null;
  public_repos: number;
  followers: number;
  following: number;
  created_at: string;
  error?: string;
}
