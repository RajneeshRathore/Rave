import React from "react";
import { useDmStore } from "../../store/useDmStore";

const Message = ({ message }) => {
  const currentUser = useDmStore((state) => state.currentUser);
  const isOwnMessage = currentUser?._id === message.sender._id;

  return (
    <div className={`flex gap-3 px-4 py-3 rounded-2xl w-fit max-w-[85%] ${
      isOwnMessage 
        ? "ml-auto bg-zinc-800 flex-row-reverse" 
        : "mr-auto bg-white/[0.03] backdrop-blur-md border border-white/[0.05]"
    } transition-all duration-300 hover:scale-[1.01]`}>
      <img
        src={message.sender.avatarUrl}
        alt="avatar"
        className="w-10 h-10 rounded-full object-cover"
      />
      <div className="flex flex-col max-w-[70%]">
        <div className={`flex items-center gap-2 ${isOwnMessage ? 'flex-row-reverse' : ''}`}>
          <span className={`font-semibold text-sm h-full ${isOwnMessage ? 'text-white' : 'text-zinc-100'}`}>
            {message.sender.username}
          </span>

          <span className={`text-xs h-full ${isOwnMessage ? 'text-zinc-400' : 'text-zinc-500'}`}>
            {new Date(message.createdAt).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </span>
        </div>

        {message.content && (
          <p className={`text-sm mt-1 leading-relaxed break-words ${isOwnMessage ? 'text-white' : 'text-zinc-300'} ${isOwnMessage ? 'text-right' : 'text-left'}`}>
            {message.content}
          </p>
        )}

        {message.attachment && (
          <div className="mt-2">
            <img
              src={message.attachment}
              alt="attachment"
              className="rounded-lg max-h-72 object-cover border border-zinc-800 shadow-md hover:scale-[1.02] transition-transform duration-300 cursor-pointer"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Message;
