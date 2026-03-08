import { useEffect} from "react";
import DmListSection from "./DmListSection";
import OpenDm from "./OpenDm";
import { useDmStore } from "../../store/useDmStore";
import FriendSection from "./FriendSection";
import axios from "axios";
import { socket } from "../../socket";
import Particles from "../animated/ParticleSpread";


const DmSection = () => {
  const activeDm = useDmStore((state) => state.activeDm);
  const setDms = useDmStore((state) => state.setDms);
  const currentUser = useDmStore((state) => state.currentUser);
  // const dms=useDmStore((state)=>state.dms)

  const getDms = async () => {
    const url = import.meta.env.VITE_BACKEND_URL;
    const res = await axios.get(`${url}/channel/dms`, {
      withCredentials: true,
    });
    return res.data;
  };

  useEffect(() => {
      if (!currentUser) return;
    const fetchDms = async () => {
      try {
        const dms = await getDms();
        setDms(dms);
      } catch (err) {
        console.error("Failed to fetch DMs", err);
      }
    };

    fetchDms();
  }, [currentUser]);
useEffect(() => {
  const handleFriendAccepted = async () => {
    try {
      const dms = await getDms();
      setDms(dms);
    } catch (err) {
      console.error("Failed to fetch DMs", err);
    }
  };

  socket.on("friendAccepted", handleFriendAccepted);

  return () => {
    socket.off("friendAccepted", handleFriendAccepted);
  };
}, []);

 return (
  <div className="w-screen h-screen relative overflow-hidden bg-[#050505]">

    <div className="absolute inset-0 z-0">
      <Particles
        particleColors={["#fcfcfc"]}
        particleCount={400}
        particleSpread={20}
        speed={0.1}
        particleBaseSize={300}
        moveParticlesOnHover
        alphaParticles={false}
        disableRotation={false}
        pixelRatio={1}
      />
    </div>

    <div className="relative z-10 flex h-full p-6 gap-6">

      <div className="
        w-[320px] h-full
        backdrop-blur-md
        border border-white/10
        rounded-2xl
        shadow-2xl
        overflow-hidden
      ">
        <DmListSection />
      </div>


      <div className="
        flex-1 h-full
        backdrop-blur-md
        border border-white/10
        rounded-2xl
        shadow-2xl
        overflow-hidden
      ">
        {activeDm ? (
          <OpenDm item={activeDm} />
        ) : (
          <div className="flex items-center justify-center h-full text-gray-300">
            <FriendSection />
          </div>
        )}
      </div>

    </div>
  </div>
);
};

export default DmSection;
