import React from "react";
import { useDmStore } from "../../store/useDmStore";

const Nameplate = ({ item, openDm }) => {
  const onlineUsers = useDmStore((state) => state.onlineUsers);
  const isOnline = onlineUsers[item._id];

  return (
    <div
      onClick={openDm}
      className={`flex items-center justify-between
      px-3 py-3
      rounded-xl
      cursor-pointer
      transition-all duration-300 ease-out
      hover:bg-white/[0.06] hover:translate-x-1 hover:shadow-lg
      ${!isOnline && 'opacity-50 grayscale hover:opacity-80 hover:grayscale-0'}`}
    >
      <div className="flex items-center gap-3">

        <div className="relative">
          <img
            src={item.avatarUrl}
            className="w-10 h-10 rounded-full object-cover ring-2 ring-transparent group-hover:ring-white/20 transition-all"
            alt={item.username}
          />
          {isOnline && (
            <span className="absolute bottom-0 right-0 h-3 w-3 bg-green-400 rounded-full border border-[#18181b]"></span>
          )}
        </div>

        <h1 className="text-sm font-medium tracking-wide text-zinc-100">{item.username}</h1>

      </div>
      {item.unread > 0 && (
        <span
          className="bg-red-500 text-white text-xs
          px-2 py-[2px]
          rounded-full
          min-w-[18px]
          text-center"
        >
          {item.unread}
        </span>
      )}
    </div>
  );
};

export default Nameplate;