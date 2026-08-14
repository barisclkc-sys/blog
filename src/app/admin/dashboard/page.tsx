import { createPost, uploadCV } from '../actions'

export default function DashboardPage() {
  return (
    <div className="max-w-4xl mx-auto space-y-12 pb-12">
      <div>
        <h1 className="text-3xl font-bold text-neutral-100 mb-2 tracking-tight">Content Manager</h1>
        <p className="text-neutral-400 font-medium">Manage your blog posts and CV.</p>
      </div>
      
      {/* Blog Post Editor */}
      <section className="bg-neutral-900 p-8 rounded-2xl border border-neutral-800 shadow-xl">
        <h2 className="text-xl font-bold text-neutral-200 mb-6 flex items-center gap-3">
          <span className="w-6 h-px bg-neutral-700"></span>
          Create New Post
        </h2>
        
        <form action={createPost} className="space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-neutral-500 mb-2">Title</label>
              <input name="title" type="text" required className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-4 py-2.5 text-neutral-200 focus:outline-none focus:border-neutral-500 transition-colors" />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-neutral-500 mb-2">Slug</label>
              <input name="slug" type="text" required className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-4 py-2.5 text-neutral-200 focus:outline-none focus:border-neutral-500 transition-colors" />
            </div>
          </div>
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-neutral-500 mb-2">Content (Markdown)</label>
            <textarea name="content" required rows={12} className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-4 py-3 text-neutral-200 focus:outline-none focus:border-neutral-500 font-mono text-sm leading-relaxed transition-colors"></textarea>
          </div>
          <div className="pt-2">
            <button type="submit" className="bg-neutral-200 text-neutral-900 font-bold py-2.5 px-6 rounded-lg hover:bg-white transition-colors">
              Publish Post
            </button>
          </div>
        </form>
      </section>

      {/* CV Uploader */}
      <section className="bg-neutral-900 p-8 rounded-2xl border border-neutral-800 shadow-xl">
        <h2 className="text-xl font-bold text-neutral-200 mb-6 flex items-center gap-3">
          <span className="w-6 h-px bg-neutral-700"></span>
          Upload CV (PDF)
        </h2>
        
        <form action={uploadCV} className="flex flex-col sm:flex-row items-start sm:items-end gap-4">
          <div className="flex-1 w-full">
            <label className="block text-xs font-bold uppercase tracking-wider text-neutral-500 mb-2">Select File</label>
            <input 
              name="file" 
              type="file" 
              accept="application/pdf" 
              required 
              className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-4 py-2 text-neutral-200 focus:outline-none focus:border-neutral-500 file:mr-4 file:py-1.5 file:px-4 file:rounded file:border-0 file:text-xs file:font-bold file:uppercase file:tracking-wider file:bg-neutral-800 file:text-neutral-300 hover:file:bg-neutral-700 transition-colors cursor-pointer" 
            />
          </div>
          <button type="submit" className="bg-neutral-200 w-full sm:w-auto text-neutral-900 font-bold py-2.5 px-6 rounded-lg hover:bg-white transition-colors h-[46px]">
            Upload
          </button>
        </form>
      </section>
      
    </div>
  )
}
