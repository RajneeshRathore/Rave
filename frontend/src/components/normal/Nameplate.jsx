import React from "react";

const Nameplate = ({ item, openDm }) => {
  return (
    <div
      onClick={openDm}
      className="flex items-center justify-between
      px-3 py-2
      rounded-lg
      cursor-pointer
      transition
      hover:bg-white/5"
    >
      <div className="flex items-center gap-3">

        <img
          src={item.avatarUrl}
          className="w-8 h-8 rounded-full object-cover"
          alt={item.username}
        />

        <h1 className="text-sm text-gray-200">{item.username}</h1>

      </div>
      {/* {item.unread > 0 && (
        <span
          className="bg-red-500 text-white text-xs
          px-2 py-[2px]
          rounded-full
          min-w-[18px]
          text-center"
        >
          {item.unread}
        </span>
      )} */}
    </div>
  );
};

export default Nameplate;