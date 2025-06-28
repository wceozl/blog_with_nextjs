// GitHub仓库信息
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
}

// GitHub API响应
export interface GitHubResponse {
  repositories: GitHubRepository[];
  total: number;
}
