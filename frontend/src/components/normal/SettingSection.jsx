import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { LogOut, Settings, Bell, Palette, Shield, User, ChevronRight, Camera, X } from "lucide-react";
import { useDmStore } from "../../store/useDmStore";
import Item from "./Item";

const SettingSection = () => {
  const navigate = useNavigate();
  const setCurrentUser = useDmStore((state) => state.setCurrentUser);
  const currentUser = useDmStore((state) => state.currentUser);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const [showEditProfile, setShowEditProfile] = useState(false);

  const handleLogout = async () => {
    const url = import.meta.env.VITE_BACKEND_URL;
    try {
      await axios.post(`${url}/auth/logout`, {}, { withCredentials: true });
      setCurrentUser(null);
      navigate("/login");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="relative flex justify-center items-start pt-20 h-full w-full bg-[#0a0a0a] overflow-y-auto">
      <div className="relative z-10 w-full max-w-2xl px-6 pb-20">
        {!showEditProfile ? (
          <>
            <div className="flex items-center gap-4 mb-10">
          <div className="p-3 bg-white/[0.03] border border-white/[0.08] rounded-2xl backdrop-blur-md">
            <Settings className="text-zinc-300" size={28} />
          </div>
          <div>
            <h2 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white to-zinc-400 tracking-tight">
              Settings
            </h2>
            <p className="text-sm text-zinc-500 mt-1 font-medium tracking-wide">Manage your account and preferences</p>
          </div>
        </div>

        {/* Profile Card Summary */}
        <div className="mb-10 p-6 rounded-[2rem] bg-gradient-to-br from-white/[0.06] to-white/[0.01] border border-white/[0.08] backdrop-blur-xl flex items-center justify-between">
          <div className="flex items-center gap-5">
            <img
              src={currentUser?.avatarUrl || "https://api.dicebear.com/7.x/avataaars/svg?seed=fallback"}
              alt="Profile"
              className="w-16 h-16 rounded-2xl object-cover border border-white/10"
            />
            <div>
              <h3 className="text-xl font-bold text-white tracking-wide">{currentUser?.username || "Guest User"}</h3>
              <p className="text-zinc-400 text-sm font-medium mt-0.5">{currentUser?.email || "No email provided"}</p>
            </div>
          </div>
          <button 
            onClick={() => setShowEditProfile(true)}
            className="px-5 py-2.5 bg-white/[0.05] hover:bg-white/[0.1] text-white text-sm font-semibold rounded-xl transition-all border border-white/[0.05] hover:border-white/20 active:scale-95"
          >
            Edit Profile
          </button>
        </div>

        {/* <div className="space-y-3 mb-10">
          <h3 className="text-xs font-bold text-zinc-500 uppercase tracking-[0.2em] mb-5 ml-2">Preferences</h3>

          <Item>
            <div className="flex items-center gap-4">
              <div className="p-3 bg-blue-500/10 text-blue-400 rounded-xl border border-blue-500/20">
                <Palette size={20} />
              </div>
              <div>
                <p className="text-zinc-100 font-semibold text-[15px] tracking-wide">Appearance</p>
                <p className="text-xs text-zinc-500 mt-1 font-medium">Dark theme active</p>
              </div>
            </div>
            <ChevronRight size={18} className="text-zinc-600 group-hover:text-zinc-300 transition-colors" />
          </Item>

          <Item>
            <div className="flex items-center gap-4">
              <div className="p-3 bg-purple-500/10 text-purple-400 rounded-xl border border-purple-500/20">
                <Bell size={20} />
              </div>
              <div>
                <p className="text-zinc-100 font-semibold text-[15px] tracking-wide">Notifications</p>
                <p className="text-xs text-zinc-500 mt-1 font-medium">Manage sound and banners</p>
              </div>
            </div>
            <ChevronRight size={18} className="text-zinc-600 group-hover:text-zinc-300 transition-colors" />
          </Item>

          <Item>
            <div className="flex items-center gap-4">
              <div className="p-3 bg-emerald-500/10 text-emerald-400 rounded-xl border border-emerald-500/20">
                <Shield size={20} />
              </div>
              <div>
                <p className="text-zinc-100 font-semibold text-[15px] tracking-wide">Privacy & Security</p>
                <p className="text-xs text-zinc-500 mt-1 font-medium">Two-factor auth and sessions</p>
              </div>
            </div>
            <ChevronRight size={18} className="text-zinc-600 group-hover:text-zinc-300 transition-colors" />
          </Item>
        </div> */}

        <div className="space-y-3">
          {/* <h3 className="text-xs font-bold text-red-500/70 uppercase tracking-[0.2em] mb-5 ml-2">Danger Zone</h3> */}

          <Item>
            <div className="flex items-center gap-4">
              <div className="p-3 bg-red-500/10 text-red-500 rounded-xl border border-red-500/20">
                <LogOut size={20} />
              </div>
              <div>
                <p className="text-red-400 font-semibold text-[15px] tracking-wide">Sign Out</p>
                <p className="text-xs text-zinc-500 mt-1 font-medium">End your current session</p>
              </div>
            </div>

            <button
              onClick={() => setShowLogoutConfirm(true)}
              className="relative overflow-hidden group/btn px-6 py-2.5 rounded-xl bg-red-500/10 border border-red-500/20 hover:border-red-500/50 transition-all duration-300 active:scale-95"
            >
              <div className="absolute inset-0 bg-red-500/20 translate-y-full group-hover/btn:translate-y-0 transition-transform duration-300 ease-in-out"></div>
              <span className="relative z-10 text-sm font-bold text-red-400 group-hover/btn:text-red-200 tracking-wide transition-colors duration-300">
                Log Out
              </span>
            </button>
          </Item>
        </div>
        </>
        ) : (
          <div className="w-full animate-in fade-in slide-in-from-right-4 duration-300">
            <div className="flex items-center gap-4 mb-10">
              <button onClick={() => setShowEditProfile(false)} className="p-3 bg-white/[0.03] border border-white/[0.08] hover:bg-white/[0.08] transition-colors rounded-xl backdrop-blur-md">
                <ChevronRight className="text-zinc-300 rotate-180" size={24} />
              </button>
              <div>
                <h2 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white to-zinc-400 tracking-tight">
                  Edit Profile
                </h2>
                <p className="text-sm text-zinc-500 mt-1 font-medium tracking-wide">Update your personal details below</p>
              </div>
            </div>

            <div className="flex flex-col items-center mb-10">
              <div className="relative group cursor-pointer">
                <img
                  src={currentUser?.avatarUrl || "https://api.dicebear.com/7.x/avataaars/svg?seed=fallback"}
                  alt="Profile"
                  className="w-28 h-28 rounded-[2rem] object-cover border-2 border-white/10 group-hover:opacity-50 transition-opacity"
                />
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <Camera className="text-white" size={32} />
                </div>
              </div>
              <p className="text-xs text-zinc-500 mt-3 font-medium tracking-wide">Click to change image</p>
            </div>

            <div className="space-y-5 mb-10">
              <div>
                <label className="block text-xs font-bold text-zinc-500 uppercase tracking-widest mb-2 ml-1">Username</label>
                <input type="text" readOnly value={currentUser?.username || ""} className="w-full bg-white/[0.02] border border-white/[0.05] rounded-2xl px-5 py-4 text-zinc-300 outline-none cursor-not-allowed focus:border-white/10 transition-colors" />
              </div>
              <div>
                <label className="block text-xs font-bold text-zinc-500 uppercase tracking-widest mb-2 ml-1">Email</label>
                <input type="email" readOnly value={currentUser?.email || ""} className="w-full bg-white/[0.02] border border-white/[0.05] rounded-2xl px-5 py-4 text-zinc-300 outline-none cursor-not-allowed focus:border-white/10 transition-colors" />
              </div>
              <div>
                <label className="block text-xs font-bold text-zinc-500 uppercase tracking-widest mb-2 ml-1">Date of Birth</label>
                <input type="text" readOnly value={currentUser?.dob ? new Date(currentUser.dob).toLocaleDateString() : "Not provided"} className="w-full bg-white/[0.02] border border-white/[0.05] rounded-2xl px-5 py-4 text-zinc-300 outline-none cursor-not-allowed focus:border-white/10 transition-colors" />
              </div>
            </div>

            <button 
              onClick={() => setShowEditProfile(false)}
              className="w-full py-4 rounded-xl font-bold text-[#121212] bg-white hover:bg-zinc-200 transition-all active:scale-[0.98]"
            >
              Save Changes
            </button>
          </div>
        )}

      </div>

      {showLogoutConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
          <div className="bg-[#121212] border border-white/10 rounded-3xl p-8 max-w-sm w-full mx-4 flex flex-col items-center text-center animate-in fade-in zoom-in-95 duration-200">
            <h2 className="text-xl font-bold text-white mb-2">Sign Out</h2>
            <p className="text-zinc-400 text-sm mb-8 leading-relaxed">
              Are you sure you want to log out of your account? You will need to log back in to access your messages.
            </p>
            <div className="flex gap-3 w-full">
              <button
                onClick={() => setShowLogoutConfirm(false)}
                className="flex-1 py-3 px-4 rounded-xl font-semibold text-white bg-white/5 hover:bg-white/10 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleLogout}
                className="flex-1 py-3 px-4 rounded-xl font-semibold text-white bg-red-500 hover:bg-red-600 transition-colors"
              >
                Log Out
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default SettingSection;