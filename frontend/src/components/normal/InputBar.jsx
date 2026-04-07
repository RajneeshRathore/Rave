import React, { useState } from "react";
import { MdGifBox, MdAttachment, MdSend } from "react-icons/md";
import { BsEmojiGrin } from "react-icons/bs";
import EmojiPicker from "./EmojiPicker";
import { useDmStore } from "../../store/useDmStore";
// import socket from "../../socket/socket";
import { socket } from "../../socket";

const InputBar = () => {
  const [content, setContent] = useState("");
  const [showEmoji, setShowEmoji] = useState(false);

  const activeDm = useDmStore((state) => state.activeDm);

  const handleSend = () => {
    if (!content.trim()) return;

    socket.emit("send_message", {
      channelId: activeDm.channelId,
      content,
      attachment: null,
    });

    setContent("");
  };


  return (
    <div
      className="rounded-2xl 
      flex items-center px-4 justify-between
      "
    >
      <input
        type="text"
        placeholder="Message..."
        className="flex-1 bg-transparent px-2 py-3 outline-none 
        text-zinc-100 placeholder-zinc-500/80
        text-[15px] font-medium tracking-wide"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            handleSend();
          }
        }}
      />

      <div className="ml-4 flex items-center gap-3 pr-2 text-zinc-500">
        {/* <MdAttachment
          size={22}
          className="hover:text-white cursor-pointer transition"
        /> */}

        <BsEmojiGrin
          size={20}
          onClick={() => setShowEmoji((prev) => !prev)}
          className="hover:text-zinc-300 cursor-pointer transition active:scale-95"
        />

        {showEmoji && (
          <EmojiPicker
            onSelect={(emoji) => {
              setContent((prev) => prev + emoji);
              setShowEmoji(false);
            }}
          />
        )}

        {/* <MdGifBox
          size={24}
          className="hover:text-white cursor-pointer transition"
        /> */}

        {/* send msg */}
        <MdSend
          size={22}
          onClick={handleSend}
          className="hover:text-white cursor-pointer transition active:scale-95 text-zinc-400"
        />
      </div>
    </div>
  );
};

export default InputBar;
