export interface IBlogMeta {
  title?: string;
  author?: string;
  tldr?: string;
  priority?: number;
  tags?: string[];
}

export interface IBlogContent {
  content: string;
}

export interface BlogCred {
  href: string;
  filePath: string;
  priority: Array<number | null>;
  title?: string;
  tldr?: string;
}

export declare type GetAllBlogs = () => BlogCred[] | Promise<BlogCred[]>;

export declare type GetFilePaths = (
  dirPath: string,
  toRem?: string
) => Promise<string[]>;
