import Nameplate from "./Nameplate";
import { useDmStore } from "../../store/useDmStore";
import { useEffect } from "react";
import { socket } from "../../socket";

const DmListSection = () => {
  const dms = useDmStore((state) => state.dms);
  const currentUser = useDmStore((state) => state.currentUser);
  const setActiveDm = useDmStore((state) => state.setActiveDm);
  const addMessage = useDmStore((state) => state.addMessage);

  
useEffect(() => {

  const handleMessage = (message) => {
    addMessage(message);
  };

  socket.on("receive_message", handleMessage);

  return () => {
    socket.off("receive_message", handleMessage);
  };

}, []);
  return (
    <div
      className="
      w-full h-full
      px-4 py-3
      overflow-y-auto
      bg-transparent
     
      border-r border-white/10
      text-white
      "
    >
     
      <div className="mb-3 px-1">
        <h2 className="text-sm font-bold tracking-wider text-gray-300 uppercase">
          Friends
        </h2>

        <div className="h-[1px] bg-white/10 mt-2"></div>
      </div>

      {dms.length === 0 && (
        <div className="text-gray-400 text-sm px-2 mt-4">
          No friends yet
        </div>
      )}

      <div className="flex flex-col gap-[4px]">
        {dms.map((item) => {
          if (!currentUser || !item.members) return null;

          const otherUser = item.members.find(
            (member) =>
              member?._id?.toString() !== currentUser?._id?.toString()
          );

          if (!otherUser) return null;

         const userWithChannel = {
  ...otherUser,
  channelId: item._id,
  unread: item.unread || 0
};

          return (
            <Nameplate
              key={item._id}
              item={userWithChannel}
              openDm={() => setActiveDm(userWithChannel)}
            />
          );
        })}
      </div>
    </div>
  );
};

export default DmListSection;
