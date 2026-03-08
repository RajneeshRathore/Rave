import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { LogOut } from "lucide-react";
import { useDmStore } from "../../store/useDmStore";
import Item from "./Item";

const SettingSection = () => {
  const navigate = useNavigate();
    const setCurrentUser=useDmStore((state)=>state.setCurrentUser);
  

  const handleLogout = async () => {
     const url=import.meta.env.VITE_BACKEND_URL
    try {
      await axios.post(`${url}/auth/logout`, {}, { withCredentials: true });
      setCurrentUser(null);
      navigate("/login");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="flex  justify-center h-full w-full bg-black p-6">
      
      <div className="w-full max-w-md rounded-xl shadow-lg p-5">
        
        <h2 className="text-2xl font-bold text-white mb-6">
          Settings
        </h2>
        <Item>
          <p className="text-white font-medium">coming soon ......</p>
        </Item>
        <Item>
          <p className="text-white font-medium">coming soon ......</p>
        </Item>
        <Item>
          
          <div>
            <p className="text-white font-medium">Logout</p>
            <p className="text-sm text-slate-400">
              Sign out from your account
            </p>
          </div>

          <button
            onClick={handleLogout}
            className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md transition"
          >
            <LogOut size={18} />
            Logout
          </button>

        </Item>

      </div>

    </div>
  );
};

export default SettingSection;