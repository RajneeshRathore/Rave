import React, { useState } from "react";
import Silk from "../components/animated/Silk";
import Logo from "../components/normal/Logo";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useDmStore } from "../store/useDmStore";


const Login = () => {
  const setCurrentUser = useDmStore((state) => state.setCurrentUser);
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const navigate = useNavigate();

  const loginHandler = async () => {
    if (!email || !password) {
      alert("All fields are required");
      return;
    }
    const url = import.meta.env.VITE_BACKEND_URL
    try {
      // console.log(url);
      const res = await axios.post(
        `${url}/auth/login`,
        {
          email,
          password,
        },
        { withCredentials: true }
      );

      console.log("Login success:", res.data);
      alert("Logged in successfully!");
      // console.log(res.data.data._id)
      console.log(res.data.data)
      setCurrentUser(res.data.data)
      navigate('/home', { replace: true })
    } catch (error) {
      console.error("Login error:", error.response?.data || error.message);
      alert(error.response?.data?.message || "Login failed");
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

          <h1 className="text-3xl font-extrabold text-center tracking-tight text-white mb-2">
            Welcome back
          </h1>
          <p className="text-center text-[15px] text-zinc-400 font-medium mb-6">
            Enter your details to sign in
          </p>

          <div className="space-y-4">
            <input
              type="text"
              placeholder="Email or Username"
              className="w-full rounded-2xl bg-white/[0.03] border border-white/10 px-5 py-4 text-[15px] text-white placeholder-zinc-500 focus:outline-none focus:border-white/30 focus:bg-white/[0.06] transition-all"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <input
              type="password"
              placeholder="Password"
              className="w-full rounded-2xl bg-white/[0.03] border border-white/10 px-5 py-4 text-[15px] text-white placeholder-zinc-500 focus:outline-none focus:border-white/30 focus:bg-white/[0.06] transition-all"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="mt-5 flex items-center justify-between px-1">
            <label className="flex items-center gap-3 cursor-pointer group">
              <div className="w-4 h-4 rounded bg-white/5 border border-white/20 group-hover:border-white/40 transition-colors"></div>
              <span className="text-sm text-zinc-400 group-hover:text-zinc-200 transition-colors font-medium">Remember me</span>
            </label>
            <p className="text-sm text-zinc-400 hover:text-white cursor-pointer transition-colors font-medium">
              Forgot password?
            </p>
          </div>

          <button
            className="mt-8 w-full rounded-2xl bg-white py-4 text-[15px] font-extrabold text-black hover:bg-zinc-200 active:scale-[0.98] transition-all shadow-xl"
            onClick={loginHandler}
          >
            Sign In
          </button>

          <p className="mt-8 text-center text-[14px] text-zinc-400 font-medium">
            Don't have an account?{" "}
            <Link to={'/register'}>
              <span className="text-white hover:underline cursor-pointer font-bold tracking-wide">
                Create one
              </span>
            </Link>
          </p>

        </div>
      </div>


    </div>

  );
};

export default Login;
