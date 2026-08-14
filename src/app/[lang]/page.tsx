import { getDictionary } from "@/dictionaries";
import { supabaseStatic } from '@/utils/supabase/static';

export const revalidate = 60;

export default async function Home(props: {
  params: Promise<{ lang: string }>;
}) {
  const params = await props.params;
  const dict = await getDictionary(params.lang);

  // Fetch all CMS data from Supabase
  const [postsRes, settingsRes, expRes, projRes] = await Promise.all([
    supabaseStatic.from('posts').select('*').order('created_at', { ascending: false }),
    supabaseStatic.from('site_settings').select('*').eq('lang', params.lang).maybeSingle(),
    supabaseStatic.from('experiences').select('*').eq('lang', params.lang).order('id', { ascending: true }),
    supabaseStatic.from('projects').select('*').eq('lang', params.lang).order('id', { ascending: true })
  ]);

  const posts = postsRes.data || [];
  const siteSettings = settingsRes.data;
  const experiences = expRes.data && expRes.data.length > 0 ? expRes.data : dict.experience.jobs;
  const projects = projRes.data && projRes.data.length > 0 ? projRes.data : dict.projects.items;

  // Fallbacks if CMS is empty
  const heroName = siteSettings?.hero_name || dict.hero.name;
  const heroTitle = siteSettings?.hero_title || dict.hero.title;
  const heroFocusTitle = siteSettings?.hero_focus_title || dict.hero.techFocusTitle;
  const heroFocus = siteSettings?.hero_focus || dict.hero.techFocus;

  return (
    <div className="space-y-24">
      
      {/* Hero Card */}
      <section className="glass-panel hover-glow transition-all duration-500 rounded-3xl p-10 shadow-xl dark:shadow-2xl">
        <h1 className="text-neutral-900 dark:text-neutral-100 text-3xl sm:text-4xl font-extrabold tracking-tight mb-3">
          {heroName}
        </h1>
        <p className="text-neutral-600 dark:text-neutral-300 text-lg sm:text-xl mb-10 font-medium leading-relaxed">
          {heroTitle}
        </p>
        
        <div className="flex flex-col gap-4 border-t border-neutral-200 dark:border-white/5 pt-8">
          <span className="text-neutral-500 dark:text-neutral-400 text-[11px] font-bold uppercase tracking-[0.2em]">
            {heroFocusTitle}
          </span>
          <p className="text-neutral-700 dark:text-neutral-200 leading-relaxed font-light text-sm sm:text-base">
            {heroFocus}
          </p>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="scroll-mt-32">
        <h2 className="text-neutral-900 dark:text-neutral-100 text-2xl font-bold tracking-tight mb-8 flex items-center gap-6">
          <span className="w-12 h-[2px] bg-neutral-300 dark:bg-neutral-800"></span>
          {dict.experience.title}
        </h2>
        
        <div className="space-y-6">
          {experiences.map((job: any, index: number) => (
            <div key={index} className="group glass-panel hover-glow transition-all duration-300 rounded-2xl p-8">
              <h3 className="text-neutral-900 dark:text-neutral-100 font-bold text-lg tracking-tight">{job.company}</h3>
              <p className="text-neutral-600 dark:text-neutral-400 text-sm font-medium mb-5 mt-1">{job.role}</p>
              <p className="text-neutral-700 dark:text-neutral-300 text-sm leading-relaxed font-light">
                {job.description}
              </p>
            </div>
          ))}
        </div>
      </section>
      
      {/* Supabase Dynamic Posts Section */}
      <section id="blog" className="scroll-mt-32">
        <h2 className="text-neutral-900 dark:text-neutral-100 text-2xl font-bold tracking-tight mb-8 flex items-center gap-6">
          <span className="w-12 h-[2px] bg-neutral-300 dark:bg-neutral-800"></span>
          {params.lang === 'tr' ? 'Blog & Yazılar' : 'Blog & Thoughts'}
        </h2>
        
        <div className="space-y-6">
          {posts.length > 0 ? (
            posts.map((post: any) => (
              <a href={`/${params.lang}/blog/${post.slug}`} key={post.slug} className="block group glass-panel hover-glow transition-all duration-300 rounded-2xl p-8">
                <h3 className="text-neutral-900 dark:text-neutral-100 font-bold text-lg mb-3 tracking-tight group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">{post.title}</h3>
                <p className="text-neutral-600 dark:text-neutral-400 text-sm leading-relaxed font-light line-clamp-3">
                  {post.content}
                </p>
                <div className="mt-6 text-[11px] font-bold uppercase tracking-[0.2em] text-neutral-500">
                  {new Date(post.created_at).toLocaleDateString(params.lang === 'tr' ? 'tr-TR' : 'en-US')}
                </div>
              </a>
            ))
          ) : (
            <div className="glass-panel rounded-2xl p-8 flex items-center justify-center">
              <p className="text-neutral-500 text-sm font-light">
                {params.lang === 'tr' ? 'Henüz içerik eklenmedi.' : 'No posts added yet.'}
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="scroll-mt-32">
        <h2 className="text-neutral-900 dark:text-neutral-100 text-2xl font-bold tracking-tight mb-8 flex items-center gap-6">
          <span className="w-12 h-[2px] bg-neutral-300 dark:bg-neutral-800"></span>
          {dict.projects.title}
        </h2>
        
        <div className="space-y-6">
          {projects.map((project: any, index: number) => (
            <div key={index} className="group glass-panel hover-glow transition-all duration-300 rounded-2xl p-8">
              <h3 className="text-neutral-900 dark:text-neutral-100 font-bold text-lg mb-6 tracking-tight">{project.name}</h3>
              <div className="flex flex-wrap gap-2">
                {project.technologies.map((tech: string) => (
                  <span key={tech} className="px-3 py-1 bg-white/50 dark:bg-white/5 text-neutral-700 dark:text-neutral-300 text-[11px] font-medium tracking-wide rounded border border-neutral-200 dark:border-white/5 shadow-sm">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}
