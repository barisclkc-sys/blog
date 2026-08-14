import { getDictionary } from "@/dictionaries";
import { supabaseStatic } from '@/utils/supabase/static';

// ISR (Incremental Static Regeneration): Sayfayı arka planda her 60 saniyede bir yeniler
export const revalidate = 60;

export default async function Home(props: {
  params: Promise<{ lang: string }>;
}) {
  const params = await props.params;
  const dict = await getDictionary(params.lang);

  // Supabase'den blog yazılarını (posts) çek (ISR mekanizmasını bozmamak için static client kullanıyoruz)
  const { data: posts } = await supabaseStatic
    .from('posts')
    .select('*')
    .order('created_at', { ascending: false });

  return (
    <div className="space-y-16">
      
      {/* Hero Card */}
      <section className="bg-neutral-800/40 rounded-2xl p-8 border border-neutral-700/30 shadow-lg">
        <h1 className="text-neutral-100 text-2xl sm:text-3xl font-bold tracking-tight mb-2">
          {dict.hero.name}
        </h1>
        <p className="text-neutral-300 text-lg mb-8 font-medium leading-snug">
          {dict.hero.title}
        </p>
        
        <div className="flex flex-col gap-3 border-t border-neutral-700/50 pt-6">
          <span className="text-neutral-400 text-xs font-bold uppercase tracking-widest">
            {dict.hero.techFocusTitle}
          </span>
          <p className="text-neutral-200 leading-relaxed font-medium">
            {dict.hero.techFocus}
          </p>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="scroll-mt-24">
        <h2 className="text-neutral-100 text-xl font-bold tracking-tight mb-6 flex items-center gap-4">
          <span className="w-8 h-px bg-neutral-600"></span>
          {dict.experience.title}
        </h2>
        
        <div className="space-y-4">
          {dict.experience.jobs.map((job: { company: string; role: string; description: string }, index: number) => (
            <div key={index} className="group bg-neutral-800/30 hover:bg-neutral-800/60 transition-all rounded-2xl p-6 border border-neutral-700/30">
              <h3 className="text-neutral-100 font-semibold text-lg">{job.company}</h3>
              <p className="text-neutral-400 text-sm font-medium mb-4">{job.role}</p>
              <p className="text-neutral-300 text-sm leading-relaxed">
                {job.description}
              </p>
            </div>
          ))}
        </div>
      </section>
      
      {/* Supabase Dynamic Posts Section */}
      <section id="blog" className="scroll-mt-24">
        <h2 className="text-neutral-100 text-xl font-bold tracking-tight mb-6 flex items-center gap-4">
          <span className="w-8 h-px bg-neutral-600"></span>
          {params.lang === 'tr' ? 'Blog & Yazılar' : 'Blog & Thoughts'}
        </h2>
        
        <div className="space-y-4">
          {posts && posts.length > 0 ? (
            posts.map((post) => (
              <div key={post.slug} className="group bg-neutral-800/30 hover:bg-neutral-800/60 transition-all rounded-2xl p-6 border border-neutral-700/30">
                <h3 className="text-neutral-100 font-semibold text-lg mb-2">{post.title}</h3>
                <p className="text-neutral-400 text-sm leading-relaxed line-clamp-3">
                  {post.content}
                </p>
                <div className="mt-4 text-xs font-bold uppercase tracking-widest text-neutral-500">
                  {new Date(post.created_at).toLocaleDateString(params.lang === 'tr' ? 'tr-TR' : 'en-US')}
                </div>
              </div>
            ))
          ) : (
            <p className="text-neutral-500 text-sm italic">
              {params.lang === 'tr' ? 'Henüz içerik eklenmedi.' : 'No posts added yet.'}
            </p>
          )}
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="scroll-mt-24">
        <h2 className="text-neutral-100 text-xl font-bold tracking-tight mb-6 flex items-center gap-4">
          <span className="w-8 h-px bg-neutral-600"></span>
          {dict.projects.title}
        </h2>
        
        <div className="space-y-4">
          {dict.projects.items.map((project: { name: string; technologies: string[] }, index: number) => (
            <div key={index} className="group bg-neutral-800/30 hover:bg-neutral-800/60 transition-all rounded-2xl p-6 border border-neutral-700/30">
              <h3 className="text-neutral-100 font-semibold text-lg mb-5">{project.name}</h3>
              <div className="flex flex-wrap gap-2">
                {project.technologies.map((tech: string) => (
                  <span key={tech} className="px-3 py-1 bg-neutral-900/80 text-neutral-300 text-xs font-semibold rounded-full border border-neutral-700/50 shadow-sm">
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
