import { login } from '../actions'

export default async function LoginPage(props: {
  searchParams: Promise<{ error?: string }>
}) {
  const searchParams = await props.searchParams;
  
  return (
    <div className="flex items-center justify-center min-h-[80vh]">
      <div className="w-full max-w-sm p-8 bg-neutral-900 rounded-2xl border border-neutral-800 shadow-2xl">
        <h1 className="text-2xl font-bold text-neutral-100 mb-8 text-center tracking-tight">Admin Login</h1>
        
        {searchParams.error && (
          <div className="mb-6 p-3 bg-red-950/30 border border-red-900/50 text-red-400 text-sm font-medium rounded-lg text-center">
            {searchParams.error}
          </div>
        )}
        
        <form className="space-y-5" action={login}>
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-neutral-500 mb-2" htmlFor="email">Email</label>
            <input 
              id="email"
              name="email" 
              type="email" 
              required 
              className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-4 py-2.5 text-neutral-200 focus:outline-none focus:border-neutral-500 transition-colors" 
            />
          </div>
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-neutral-500 mb-2" htmlFor="password">Password</label>
            <input 
              id="password"
              name="password" 
              type="password" 
              required 
              className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-4 py-2.5 text-neutral-200 focus:outline-none focus:border-neutral-500 transition-colors"
            />
          </div>
          <button 
            type="submit" 
            className="w-full bg-neutral-200 text-neutral-900 font-bold py-2.5 rounded-lg hover:bg-white transition-colors mt-2"
          >
            Sign In
          </button>
        </form>
      </div>
    </div>
  )
}
