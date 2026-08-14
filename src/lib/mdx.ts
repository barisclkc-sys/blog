import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

// MDX dosyalarının bulunduğu ana dizin
const root = process.cwd();
const contentDir = path.join(root, 'src', 'content', 'blog');

export interface PostMetadata {
  title: string;
  date: string;
  summary: string;
  tags: string[];
}

export interface Post {
  slug: string;
  metadata: PostMetadata;
  content: string;
}

/**
 * Belirtilen slug değerine (dosya adına) sahip blog yazısını getirir.
 */
export function getPostBySlug(slug: string): Post {
  const realSlug = slug.replace(/\.mdx$/, '');
  const filePath = path.join(contentDir, `${realSlug}.mdx`);
  const fileContent = fs.readFileSync(filePath, 'utf8');
  
  // gray-matter ile metadata ve içeriği ayrıştırıyoruz
  const { data, content } = matter(fileContent);
  
  return {
    slug: realSlug,
    // gray-matter'dan gelen veriyi PostMetadata arayüzüne (interface) zorluyoruz.
    metadata: data as unknown as PostMetadata,
    content
  };
}

/**
 * src/content/blog dizinindeki tüm blog yazılarını getirir.
 */
export function getAllPosts(): Post[] {
  // Dizin henüz yoksa boş bir dizi döneriz
  if (!fs.existsSync(contentDir)) {
    return [];
  }
  
  const files = fs.readdirSync(contentDir);
  
  const posts = files
    .filter((file) => file.endsWith('.mdx'))
    .map((file) => {
      const slug = file.replace(/\.mdx$/, '');
      return getPostBySlug(slug);
    })
    // Yazıları tarihe göre yeniden eskiye doğru sıralıyoruz
    .sort((a, b) => {
      const dateA = new Date(a.metadata.date).getTime();
      const dateB = new Date(b.metadata.date).getTime();
      return dateB - dateA;
    });
    
  return posts;
}
