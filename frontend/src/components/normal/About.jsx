import React from 'react'

const About = () => {
  return (
    <section className="sticky top-0 min-h-screen bg-black text-white flex border-t border-white/[0.05]">
      
      <div className="w-full md:w-1/2 h-full flex items-center justify-center px-6 md:px-12 z-10">
        <div className="max-w-lg space-y-8 py-20 relative">
          
          <div className="w-16 h-16 rounded-2xl bg-white/[0.05] border border-white/10 flex items-center justify-center mb-6">
            <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>

          <h1 className="text-5xl md:text-6xl font-bold tracking-tighter leading-[1.1]">
            Chat. Instantly.<br/>
            Securely.
          </h1>

          <p className="text-xl text-zinc-400 font-medium leading-relaxed">
            A fast, lightweight group chat designed for real conversations.
            Built for speed, privacy, and simplicity — with end-to-end encryption
            by default, so your messages stay yours.
            <span className="block mt-6 text-white text-lg font-bold">
              Always online. Always secure.
            </span>
          </p>

        </div>
      </div>

      <div className="hidden md:flex w-1/2 h-full items-center justify-center p-12 relative">
         <div className="relative w-full aspect-square max-w-2xl rounded-[2rem] bg-white/[0.02] border border-white/10 overflow-hidden flex items-center justify-center">
           <img 
              src="/src/assets/chat_app_mockup.png" 
              className="absolute inset-0 w-full h-full object-cover opacity-60 mix-blend-lighten grayscale hover:grayscale-0 transition-all duration-700"
              alt="App Interface" 
           />
         </div>
      </div>

    </section>
  )
}

export default About
