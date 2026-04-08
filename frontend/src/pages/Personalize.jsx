import React, { useState, useRef } from "react";
import Logo from "../components/normal/Logo";
import Silk from "../components/animated/Silk";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useDmStore } from "../store/useDmStore";

const Personalize = () => {
  const navigate = useNavigate();
  const currentUser = useDmStore((state) => state.currentUser);
  const setCurrentUser = useDmStore((state) => state.setCurrentUser);

  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState(currentUser?.avatarUrl || "https://api.dicebear.com/7.x/thumbs/png?seed=NightCoder");
  const [isLoading, setIsLoading] = useState(false);
  const fileInputRef = useRef(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      const objectUrl = URL.createObjectURL(file);
      setPreview(objectUrl);
    }
  };

  const uploadAndSave = async () => {
    if (!selectedFile) {
      // Just continue to home with default avatar
      navigate("/home", { replace: true });
      return;
    }

    setIsLoading(true);
    try {
      // 1. Upload to Cloudinary
      const formData = new FormData();
      formData.append("file", selectedFile);
      formData.append("upload_preset", "raven_data"); // the upload preset requested

      const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
      if (!cloudName) {
        throw new Error("Cloudinary cloud name is not configured in .env");
      }

      const cloudinaryRes = await axios.post(
        `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
        formData
      );

      const avatarUrl = cloudinaryRes.data.secure_url;

      // 2. Patch to backend
      const backendUrl = import.meta.env.VITE_BACKEND_URL;
      const res = await axios.patch(
        `${backendUrl}/user/me`,
        { avatarUrl },
        { withCredentials: true }
      );

      // 3. Update store and navigate
      setCurrentUser(res.data.data);
      navigate("/home", { replace: true });
    } catch (error) {
      console.error("Upload error:", error);
      const serverMessage = error.response?.data?.error?.message || error.response?.data?.message || "";
      alert(`Failed to upload avatar: ${serverMessage || error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="h-screen bg-black">
      <div className="fixed top-0 left-0 w-full z-50 flex items-center justify-between py-2">
        <Logo />
      </div>
      <div className="absolute inset-0 z-0 overflow-hidden">
        <Silk speed={3} scale={1.5} color="#15151A" noiseIntensity={0.2} rotation={0} />
      </div>

      <div className="h-full w-[100vw] fixed top-0 left-0 flex items-center justify-center text-white p-6 z-10 pointer-events-none">
        <div className="w-full max-w-sm rounded-[2.5rem] bg-white/[0.04] backdrop-blur-3xl border border-white/[0.08] flex flex-col items-center p-8 shadow-[0_0_60px_-15px_rgba(255,255,255,0.05)] pointer-events-auto">
          <h1 className="text-3xl font-extrabold text-center tracking-tight text-white mb-2">
            Set Profile Picture
          </h1>
          <p className="text-center text-[15px] text-zinc-400 font-medium mb-8">
            Personalize your Raven experience
          </p>

          <div
            className="relative group cursor-pointer w-32 h-32 mb-8 rounded-full overflow-hidden border-2 border-white/10 hover:border-white/30 transition-all shadow-xl"
            onClick={() => fileInputRef.current?.click()}
          >
            <img
              src={preview}
              alt="Profile Preview"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
              <span className="text-white text-sm font-semibold">Upload</span>
            </div>
          </div>

          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            onChange={handleImageChange}
            className="hidden"
          />

          <button
            onClick={uploadAndSave}
            disabled={isLoading}
            className={`w-full rounded-2xl py-4 text-[15px] font-extrabold text-black transition-all shadow-xl ${isLoading
                ? "bg-zinc-400 cursor-not-allowed"
                : "bg-white hover:bg-zinc-200 active:scale-[0.98]"
              }`}
          >
            {isLoading ? "Uploading..." : selectedFile ? "Save & Continue" : "Skip for now"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Personalize;
