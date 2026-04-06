import React from "react";
import BlogCard from "./BlogCard";

const Feature = () => {
  return (
    <div className="relative w-full z-10">

      {/* Section 1 */}
      <section className="sticky top-0 min-h-screen flex text-white bg-black border-t border-white/[0.05]">
        <div className="hidden md:flex w-1/2 items-center justify-center p-12">
           <div className="relative w-full aspect-[4/3] max-w-xl rounded-[2rem] bg-black border border-white/[0.1] overflow-hidden flex items-center justify-center p-8">
              <div className="w-full h-full bg-white/[0.02] rounded-xl border border-white/10 flex flex-col justify-end p-6 relative">
                 <div className="absolute top-6 left-6 right-6 flex flex-col gap-4">
                    <div className="w-3/4 h-12 rounded-xl bg-white/10 self-end"></div>
                    <div className="w-1/2 h-12 rounded-xl bg-white/5 border border-white/10"></div>
                    <div className="w-2/3 h-12 rounded-xl bg-white/10 self-end"></div>
                 </div>
                 <div className="w-full h-14 rounded-xl bg-white/5 border border-white/10 mt-auto"></div>
              </div>
           </div>
        </div>

        <div className="w-full md:w-1/2 flex items-center justify-center px-6 md:px-12 z-10">
          <div className="max-w-lg space-y-6 py-16">
            <h1 className="text-5xl md:text-6xl font-bold tracking-tighter leading-tight">
              Ultra-Fast <br/>Messaging
            </h1>

            <p className="text-xl text-zinc-400 font-medium leading-relaxed">
              Built on persistent WebSocket connections for true real-time delivery. No polling, no delays.
              <span className="block mt-6 text-white text-lg font-bold">
                Feels instant. Because it is.
              </span>
            </p>
          </div>
        </div>
      </section>

      {/* Section 2 */}
      <section className="sticky top-0 min-h-screen flex text-white bg-black border-t border-white/[0.05]">
        <div className="w-full md:w-1/2 flex items-center justify-center px-6 md:px-12 z-10">
          <div className="max-w-lg space-y-6 py-16">
            <h1 className="text-5xl md:text-6xl font-bold tracking-tighter leading-tight">
              End-to-End <br/>Encryption
            </h1>

            <p className="text-xl text-zinc-400 font-medium leading-relaxed">
              Your conversations stay private by design. Robust cryptographic protocols ensure that your messages are locked.
              <span className="block mt-6 text-white text-lg font-bold">
                Even we can’t read your messages.
              </span>
            </p>
          </div>
        </div>

        <div className="hidden md:flex w-1/2 items-center justify-center p-12">
            <div className="relative w-full aspect-square max-w-xl rounded-[2rem] bg-white/[0.02] border border-white/10 flex items-center justify-center">
               <svg className="w-32 h-32 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
               </svg>
            </div>
        </div>
      </section>

      {/* Section 3 - Blog Cards */}
      <section className="sticky top-0 min-h-screen flex flex-col items-center justify-center gap-16 px-6 py-24 text-center text-white bg-black border-t border-white/[0.05]">
        <div className="max-w-3xl">
          <h2 className="text-5xl md:text-6xl font-bold tracking-tighter">
            Built for What Matters
          </h2>
          <p className="mt-6 text-xl text-zinc-400 font-medium">
            Privacy, performance, and communities without compromises.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 max-w-7xl mx-auto w-full">
          <BlogCard
            title="Privacy First"
            description="No data selling. No tracking pixels. We believe your communication should be entirely yours. Period."
          />
          <BlogCard
            title="Voice & Media"
            description="Crystal-clear low-latency voice and high-resolution media sharing integrated seamlessly into the chat."
          />
          <BlogCard
            title="Community Context"
            description="Smart group management with robust role-based permissions designed for communities of all sizes."
          />
        </div>
      </section>

    </div>
  );
};

export default Feature;