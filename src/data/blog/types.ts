export type ArticleSection = {
  heading: string;
  paragraphs: string[];
};

export type ArticleFaqItem = { q: string; a: string };

export type ArticleContent = {
  title: string;
  description: string;
  excerpt: string;
  intro: string[];
  sections: ArticleSection[];
  faq?: ArticleFaqItem[];
};
