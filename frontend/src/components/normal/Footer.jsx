import React from 'react'

const Footer = () => {
  return (
    <footer className="w-full bg-black text-white py-12 border-t border-white/10 relative z-20">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
        
        <div className="flex flex-col items-center md:items-start">
          <span className="text-xl font-bold tracking-tight">Raven</span>
          <p className="mt-2 text-sm text-zinc-500">
            &copy; {new Date().getFullYear()} Raven Team. All rights reserved.
          </p>
        </div>

        <div className="flex gap-6 text-sm font-medium text-zinc-400">
          <a href="#" className="hover:text-white transition-colors">Privacy</a>
          <a href="#" className="hover:text-white transition-colors">Terms</a>
          <a href="#" className="hover:text-white transition-colors">Contact</a>
          <a href="https://github.com/ananthak803" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">GitHub</a>
        </div>

      </div>
    </footer>
  )
}

export default Footer
