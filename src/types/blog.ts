
import React from 'react';

export interface BlogArticle {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: React.ReactNode;
  author: string;
  date: string;
  category: string;
  readTime: string;
}
