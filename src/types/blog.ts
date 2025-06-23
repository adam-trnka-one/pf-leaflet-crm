
import { ReactNode } from 'react';

export interface TableOfContentsItem {
  id: string;
  title: string;
}

export interface BlogArticle {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: ReactNode;
  author: string;
  date: string;
  category: string;
  readTime: string;
  tableOfContents?: TableOfContentsItem[];
}
