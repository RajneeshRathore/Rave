import React, { useState } from 'react'
import Logo from '../components/normal/Logo'
import Silk from '../components/animated/Silk'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
const Register = () => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [dob, setDob] = useState("");
  const navigate = useNavigate();

  const registerHandler = async () => {
    if (!email || !username || !password || !dob) {
      alert("All fields are required");
      return;
    }
    const url = import.meta.env.VITE_BACKEND_URL
    try {
      console.log(url);
      const res = await axios.post(
        `${url}/auth/register`,
        {
          email,
          username,
          password,
          dob,
        }
      );

      console.log("Register success:", res.data);
      alert("Account created successfully!");
      navigate('/login', { replace: true })
    } catch (error) {
      console.error("Register error:", error.response?.data || error.message);
      alert(error.response?.data?.message || "Registration failed");
    }
  };


  return (
    <div className="h-screen bg-black">
      <div
        className="fixed top-0 left-0 w-full z-50 
                          flex items-center justify-between
                           py-2
                          "
      >
        <Logo />
      </div>
      <div className="absolute inset-0 z-0 overflow-hidden">
        <Silk
          speed={3}
          scale={1.5}
          color="#15151A"
          noiseIntensity={0.2}
          rotation={0}
        />
      </div>
      <div className="h-full w-[100vw] fixed top-0 left-0 flex items-center justify-center text-white p-6 z-10 pointer-events-none">
        <div className="w-full max-w-sm rounded-[2.5rem] bg-white/[0.04] backdrop-blur-3xl border border-white/[0.08] flex flex-col p-8 shadow-[0_0_60px_-15px_rgba(255,255,255,0.05)] pointer-events-auto">

          <h1 className="text-3xl font-extrabold text-center tracking-tight text-white">
            Create Account
          </h1>
          <p className="mt-2 text-center text-[15px] text-zinc-400 font-medium">
            Join Raven and start chatting securely
          </p>

          <div className="mt-6 space-y-3.5">
            <input
              type="email"
              placeholder="Email address"
              className="w-full rounded-2xl bg-white/[0.03] border border-white/10 px-5 py-3.5 text-[15px] text-white placeholder-zinc-500 focus:outline-none focus:border-white/30 focus:bg-white/[0.06] transition-all"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <input
              type="text"
              placeholder="Username"
              className="w-full rounded-2xl bg-white/[0.03] border border-white/10 px-5 py-3.5 text-[15px] text-white placeholder-zinc-500 focus:outline-none focus:border-white/30 focus:bg-white/[0.06] transition-all"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />

            <input
              type="password"
              placeholder="Password"
              className="w-full rounded-2xl bg-white/[0.03] border border-white/10 px-5 py-3.5 text-[15px] text-white placeholder-zinc-500 focus:outline-none focus:border-white/30 focus:bg-white/[0.06] transition-all"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <div className="relative">
              <input
                type="date"
                className="w-full rounded-2xl bg-white/[0.03] border border-white/10 px-5 py-3.5 text-[15px] text-white placeholder-zinc-500 focus:outline-none focus:border-white/30 focus:bg-white/[0.06] transition-all tracking-wide"
                value={dob}
                onChange={(e) => setDob(e.target.value)}
              />
            </div>
          </div>

          <button
            className="mt-6 w-full rounded-2xl bg-white py-3.5 text-[15px] font-extrabold text-black hover:bg-zinc-200 active:scale-[0.98] transition-all shadow-xl"
            onClick={registerHandler}
          >
            Sign Up
          </button>

          <p className="mt-6 text-center text-[14px] text-zinc-400 font-medium">
            Already have an account?{" "}
            <Link to="/login" >
              <span className="text-white hover:underline cursor-pointer font-bold tracking-wide">
                Sign in
              </span>
            </Link>
          </p>

        </div>
      </div>

    </div>
  );
}

export default Register
