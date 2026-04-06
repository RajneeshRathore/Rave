import React from 'react'
import { useNavigate } from 'react-router-dom'
import Silk from '../animated/Silk'

const Hero = () => {
  const navigate = useNavigate();

  return (
    <section className="sticky top-0 w-full h-screen bg-black overflow-hidden flex flex-col items-center justify-center">

      <div className="absolute inset-0 z-0">
        <Silk
          speed={3}
          scale={1.5}
          color="#15151A"
          noiseIntensity={0.2}
          rotation={0}
        />
      </div>

      <div className="relative z-10 flex flex-col items-center text-center px-6 mt-16 w-full max-w-5xl mx-auto">
        
        <div className="px-4 py-1.5 mb-8 rounded-full bg-white/[0.02] border border-white/[0.05] backdrop-blur-md flex items-center gap-3">
           <span className="w-2 h-2 rounded-full bg-zinc-400 animate-pulse"></span>
           <span className="text-[11px] font-bold text-zinc-400 tracking-[0.2em] uppercase">Now fully encrypted end-to-end</span>
        </div>

        <h1 className="text-6xl md:text-[7rem] lg:text-[9rem] font-bold tracking-tighter leading-[0.85] w-full isolate text-white">
          <span className="block pb-2">SIMPLE<span className="text-white/20">.</span></span>
          <span className="block pb-2">FAST<span className="text-white/20">.</span></span>
          <span className="block pb-2">SECURE</span>
        </h1>

        <p className="mt-10 text-lg md:text-xl text-zinc-400 max-w-2xl font-medium tracking-wide leading-relaxed">
          The most elegant way to communicate. Built with unparalleled speed, absolute privacy, and a beautiful interface that gets out of your way.
        </p>

        <div className="flex flex-col sm:flex-row items-center gap-6 mt-12">
          <button 
            onClick={() => navigate("/register")}
            className="px-8 py-4 rounded-xl font-bold text-lg text-black bg-white hover:bg-zinc-200 transition-colors w-full sm:w-auto"
          >
            Start Chatting Free
          </button>
          <button 
            onClick={() => navigate("/login")}
            className="px-8 py-4 rounded-xl font-bold text-lg text-white bg-transparent border border-white/20 hover:bg-white/5 transition-colors w-full sm:w-auto"
          >
            I have an account
          </button>
        </div>
      </div>

    </section>
  )
}

export default Hero
