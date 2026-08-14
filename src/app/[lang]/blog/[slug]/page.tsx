import { supabaseStatic } from '@/utils/supabase/static';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { MDXRemote } from 'next-mdx-remote/rsc';
import rehypePrettyCode from 'rehype-pretty-code';

export const revalidate = 60;

export default async function BlogPostPage(props: {
  params: Promise<{ lang: string; slug: string }>;
}) {
  const params = await props.params;

  const { data: post } = await supabaseStatic
    .from('posts')
    .select('*')
    .eq('slug', params.slug)
    .single();

  if (!post) {
    notFound();
  }

  const isTr = params.lang === 'tr';

  return (
    <div className="max-w-3xl mx-auto py-12 px-6 lg:py-24 animate-in fade-in duration-500">
      <Link 
        href={`/${params.lang}#blog`}
        className="inline-flex items-center text-sm font-medium text-neutral-500 hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors mb-12 group"
      >
        <span className="mr-2 transition-transform group-hover:-translate-x-1">←</span>
        {isTr ? 'Geri Dön' : 'Go Back'}
      </Link>

      <article>
        <header className="mb-12">
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-neutral-900 dark:text-neutral-100 mb-6 leading-tight">
            {post.title}
          </h1>
          <div className="flex items-center gap-4 text-sm font-medium text-neutral-500">
            <time dateTime={post.created_at}>
              {new Date(post.created_at).toLocaleDateString(isTr ? 'tr-TR' : 'en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </time>
            <span className="w-1 h-1 rounded-full bg-neutral-300 dark:bg-neutral-700"></span>
            <span>{isTr ? 'Barış Çolakça' : 'Barış Çolakça'}</span>
          </div>
        </header>

        <div className="prose prose-neutral dark:prose-invert prose-lg max-w-none">
          <MDXRemote 
            source={post.content} 
            options={{
              mdxOptions: {
                rehypePlugins: [[rehypePrettyCode, { theme: 'one-dark-pro' }]],
              }
            }}
          />
        </div>
      </article>
    </div>
  );
}
