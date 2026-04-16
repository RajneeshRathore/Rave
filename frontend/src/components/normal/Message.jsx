import React from "react";
import { useDmStore } from "../../store/useDmStore";
import { optimizeAvatar } from "../../utils/optimizeAvatar";

const Message = ({ message }) => {
  const currentUser = useDmStore((state) => state.currentUser);
  const isOwnMessage = currentUser?._id === message.sender._id;

  //console.log("info log: ",message);

  return (
    <div
      className={`flex gap-3 px-4 py-3 rounded-2xl w-fit max-w-[85%] ${
        isOwnMessage
          ? "ml-auto bg-zinc-800 flex-row-reverse"
          : "mr-auto bg-white/[0.03] backdrop-blur-md border border-white/[0.05]"
      } transition-all duration-300 hover:scale-[1.01]`}
    >
      <img
        src={optimizeAvatar(message.sender.avatarUrl)}
        alt="avatar"
        className="w-10 h-10 rounded-full object-cover"
      />
      <div className="flex flex-col max-w-[70%]">
        <div
          className={`flex items-center gap-2 ${isOwnMessage ? "flex-row-reverse" : ""}`}
        >
          <span
            className={`font-semibold text-sm h-full ${isOwnMessage ? "text-white" : "text-zinc-100"}`}
          >
            {message.sender.username}
          </span>

          <span
            className={`text-xs h-full whitespace-nowrap ${isOwnMessage ? "text-zinc-400" : "text-zinc-500"}`}
          >
            {new Date(message.createdAt).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </span>
        </div>

        {message.content && (
          <p
            className={`text-sm mt-1 leading-relaxed break-words ${isOwnMessage ? "text-white" : "text-zinc-300"} ${isOwnMessage ? "text-right" : "text-left"}`}
          >
            {message.content}
          </p>
        )}

        {message.attachment?.map((file, index) => (
          <div key={index}>
            {file.type === "image" && (
              <img src={file.url} className="w-40 rounded p-2" />
            )}

            {file.type === "video" && (
              <video src={file.url} controls className="w-40 rounded p-2" />
            )}

            {file.type === "file" && (
              <a href={file.url} target="_blank">
                📄 {file.fileName}
              </a>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Message;
