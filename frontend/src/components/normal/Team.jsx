import React from 'react'
import ChromaGrid from '../animated/ChromaGrid'
import ravenWhite from '../../assets/raven_white.png'

const Team = () => {
  const items = [
    {
      image: ravenWhite,
      title: "Anantha Krishnan",
      subtitle: "Frontend Developer",
      handle: "@ananthak803",
      borderColor: "#3B82F6",
      gradient: "linear-gradient(145deg, #3B82F6, #000)",
      url: "https://github.com/ananthak803",
    },
    {
      image: ravenWhite,
      title: "Rajneesh Rathore",
      subtitle: "Backend Engineer",
      handle: "@rajneesh",
      borderColor: "#10B981",
      gradient: "linear-gradient(180deg, #10B981, #000)",
      url: "https://github.com/RajneeshRathore",
    },
    {
      image: ravenWhite,
      title: "Shivam Panwar",
      subtitle: "Backend Engineer",
      handle: "@shivam",
      borderColor: "#F59E0B",
      gradient: "linear-gradient(160deg, #F59E0B, #000)",
      url: "https://github.com/raddishbunny",
    },
    {
      image: ravenWhite,
      title: "Akash Chaudhary",
      subtitle: "Database Engineer",
      handle: "@imakash",
      borderColor: "#EC4899",
      gradient: "linear-gradient(170deg, #EC4899, #000)",
      url: "https://github.com/akashchaudhary18",
    },
  ]

  return (
    <div className="w-full h-[150vh] bg-black">
      <section className="sticky top-0 h-screen bg-black flex flex-col items-center justify-center border-t border-white/[0.05] relative overflow-hidden">
        
        <div className="mb-8 text-center relative z-10 w-full px-6">
          <h2 className="text-5xl md:text-6xl font-bold text-white tracking-tighter">
            Meet the Team
          </h2>
          <p className="mt-4 text-xl text-zinc-400 font-medium tracking-wide">
            The people building secure, private communication.
          </p>
        </div>

        <div style={{ height: '600px', position: 'relative', width: '100%' }} className="z-10">
          <ChromaGrid
            items={items}
            radius={200}
            damping={0.45}
            fadeOut={0.6}
            ease="power3.out"
          />
        </div>

      </section>
    </div>
  )
}

export default Team
