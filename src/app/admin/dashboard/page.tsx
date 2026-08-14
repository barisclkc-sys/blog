import { createPost, uploadCV, updateSiteSettings, addExperience, addProject } from '../actions'

export default function DashboardPage() {
  return (
    <div className="max-w-5xl mx-auto space-y-12 pb-12">
      <div>
        <h1 className="text-3xl font-bold text-neutral-100 mb-2 tracking-tight">Full CMS Dashboard</h1>
        <p className="text-neutral-400 font-medium">Manage your site content dynamically.</p>
      </div>

      {/* Global Site Settings */}
      <section className="bg-neutral-900 p-8 rounded-2xl border border-neutral-800 shadow-xl">
        <h2 className="text-xl font-bold text-neutral-200 mb-6 flex items-center gap-3">
          <span className="w-6 h-px bg-neutral-700"></span>
          Site Settings (Hero Section)
        </h2>
        <form action={updateSiteSettings} className="space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-neutral-500 mb-2">Language</label>
              <select name="lang" className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-4 py-2.5 text-neutral-200">
                <option value="en">English (en)</option>
                <option value="tr">Türkçe (tr)</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-neutral-500 mb-2">Name</label>
              <input name="hero_name" type="text" required className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-4 py-2.5 text-neutral-200" />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-neutral-500 mb-2">Title (e.g. Senior Student...)</label>
              <input name="hero_title" type="text" required className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-4 py-2.5 text-neutral-200" />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-neutral-500 mb-2">Focus Title</label>
              <input name="hero_focus_title" type="text" required className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-4 py-2.5 text-neutral-200" />
            </div>
            <div className="md:col-span-2">
              <label className="block text-xs font-bold uppercase tracking-wider text-neutral-500 mb-2">Focus Description</label>
              <textarea name="hero_focus" required rows={3} className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-4 py-2.5 text-neutral-200"></textarea>
            </div>
          </div>
          <button type="submit" className="bg-neutral-200 text-neutral-900 font-bold py-2 px-6 rounded hover:bg-white transition-colors">
            Save Settings
          </button>
        </form>
      </section>

      {/* Experience Manager */}
      <section className="bg-neutral-900 p-8 rounded-2xl border border-neutral-800 shadow-xl">
        <h2 className="text-xl font-bold text-neutral-200 mb-6 flex items-center gap-3">
          <span className="w-6 h-px bg-neutral-700"></span>
          Add Experience
        </h2>
        <form action={addExperience} className="space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-neutral-500 mb-2">Language</label>
              <select name="lang" className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-4 py-2.5 text-neutral-200">
                <option value="en">English (en)</option>
                <option value="tr">Türkçe (tr)</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-neutral-500 mb-2">Company</label>
              <input name="company" type="text" required className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-4 py-2.5 text-neutral-200" />
            </div>
            <div className="md:col-span-2">
              <label className="block text-xs font-bold uppercase tracking-wider text-neutral-500 mb-2">Role / Title</label>
              <input name="role" type="text" required className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-4 py-2.5 text-neutral-200" />
            </div>
            <div className="md:col-span-2">
              <label className="block text-xs font-bold uppercase tracking-wider text-neutral-500 mb-2">Description</label>
              <textarea name="description" required rows={3} className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-4 py-2.5 text-neutral-200"></textarea>
            </div>
          </div>
          <button type="submit" className="bg-neutral-200 text-neutral-900 font-bold py-2 px-6 rounded hover:bg-white transition-colors">
            Add Experience
          </button>
        </form>
      </section>

      {/* Project Manager */}
      <section className="bg-neutral-900 p-8 rounded-2xl border border-neutral-800 shadow-xl">
        <h2 className="text-xl font-bold text-neutral-200 mb-6 flex items-center gap-3">
          <span className="w-6 h-px bg-neutral-700"></span>
          Add Project
        </h2>
        <form action={addProject} className="space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-neutral-500 mb-2">Language</label>
              <select name="lang" className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-4 py-2.5 text-neutral-200">
                <option value="en">English (en)</option>
                <option value="tr">Türkçe (tr)</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-neutral-500 mb-2">Project Name</label>
              <input name="name" type="text" required className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-4 py-2.5 text-neutral-200" />
            </div>
            <div className="md:col-span-2">
              <label className="block text-xs font-bold uppercase tracking-wider text-neutral-500 mb-2">Technologies (comma separated)</label>
              <input name="technologies" type="text" required placeholder="React, Tailwind, Supabase" className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-4 py-2.5 text-neutral-200" />
            </div>
          </div>
          <button type="submit" className="bg-neutral-200 text-neutral-900 font-bold py-2 px-6 rounded hover:bg-white transition-colors">
            Add Project
          </button>
        </form>
      </section>

      {/* Blog Post Editor (Existing) */}
      <section className="bg-neutral-900 p-8 rounded-2xl border border-neutral-800 shadow-xl">
        <h2 className="text-xl font-bold text-neutral-200 mb-6 flex items-center gap-3">
          <span className="w-6 h-px bg-neutral-700"></span>
          Create New Blog Post
        </h2>
        <form action={createPost} className="space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-neutral-500 mb-2">Title</label>
              <input name="title" type="text" required className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-4 py-2.5 text-neutral-200" />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-neutral-500 mb-2">Slug</label>
              <input name="slug" type="text" required className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-4 py-2.5 text-neutral-200" />
            </div>
          </div>
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-neutral-500 mb-2">Content (Markdown)</label>
            <textarea name="content" required rows={8} className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-4 py-3 text-neutral-200 font-mono text-sm"></textarea>
          </div>
          <button type="submit" className="bg-neutral-200 text-neutral-900 font-bold py-2 px-6 rounded hover:bg-white transition-colors">
            Publish Post
          </button>
        </form>
      </section>

      {/* CV Uploader (Existing) */}
      <section className="bg-neutral-900 p-8 rounded-2xl border border-neutral-800 shadow-xl">
        <h2 className="text-xl font-bold text-neutral-200 mb-6 flex items-center gap-3">
          <span className="w-6 h-px bg-neutral-700"></span>
          Upload CV (PDF)
        </h2>
        <form action={uploadCV} className="flex flex-col sm:flex-row items-end gap-4">
          <div className="flex-1 w-full">
            <label className="block text-xs font-bold uppercase tracking-wider text-neutral-500 mb-2">Select File</label>
            <input name="file" type="file" accept="application/pdf" required className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-4 py-1.5 text-neutral-200" />
          </div>
          <button type="submit" className="bg-neutral-200 text-neutral-900 font-bold py-2 px-6 rounded hover:bg-white h-[42px]">
            Upload
          </button>
        </form>
      </section>
      
    </div>
  )
}
