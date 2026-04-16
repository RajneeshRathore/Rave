import React, { useState, useRef } from "react";
import { MdSend } from "react-icons/md";
import { BsEmojiGrin } from "react-icons/bs";
import { FaFolderPlus } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import EmojiPicker from "./EmojiPicker";
import { useDmStore } from "../../store/useDmStore";
import { socket } from "../../socket";

const InputBar = () => {
  const fileInputRef = useRef(null);

  const [content, setContent] = useState("");
  const [showEmoji, setShowEmoji] = useState(false);
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(false);

  const activeDm = useDmStore((state) => state.activeDm);

  // 🔹 Handle multiple files
  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);

    const mapped = selectedFiles.map((file) => ({
      file,
      preview: URL.createObjectURL(file),
    }));

    setFiles((prev) => [...prev, ...mapped]);
  };

  // 🔹 Remove file
  const removeFile = (index) => {
    const updated = [...files];
    URL.revokeObjectURL(updated[index].preview); // cleanup
    updated.splice(index, 1);
    setFiles(updated);
  };

  // 🔥 Upload + Send
  const handleSend = async () => {
  if (!content.trim() && files.length === 0) return;
  if (!activeDm?.channelId) return;

  setLoading(true);

  try {
    const uploadPromises = files.map(async (item) => {
      const formData = new FormData();
      formData.append("file", item.file);
      formData.append("upload_preset", "chat_app_uploads");

      const res = await fetch(
        `https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUDINARY_CLOUD_NAME}/auto/upload`,
        {
          method: "POST",
          body: formData,
        }
      );

      if (!res.ok) throw new Error("Upload failed");

      const data = await res.json();

      return {
        url: data.secure_url,
        type: data.resource_type,
        fileName: item.file.name,
        size: item.file.size,
      };
    });

    const attachments = await Promise.all(uploadPromises);
    console.log("Attachments uploaded:", attachments);


    socket.emit("send_message", {
      channelId: activeDm.channelId,
      content,
      attachment: attachments,
    });

    setContent("");
    files.forEach((f) => URL.revokeObjectURL(f.preview));
    setFiles([]);
    fileInputRef.current.value = null;

  } catch (err) {
    console.error(err);
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="px-4 py-2 border-t border-zinc-800">
      {/* 🔥 Preview Grid */}
      {files.length > 0 && (
        <div className="grid grid-cols-3 gap-2 mb-3">
          {files.map((item, index) => (
            <div key={index} className="relative">
              {/* Preview */}
              {item.file.type.startsWith("image") ? (
                <img
                  src={item.preview}
                  className="w-full h-24 object-cover rounded"
                />
              ) : item.file.type.startsWith("video") ? (
                <video
                  src={item.preview}
                  className="w-full h-24 object-cover rounded"
                />
              ) : (
                <div className="h-24 flex items-center justify-center bg-zinc-800 rounded text-xs p-1">
                  📄 {item.file.name}
                </div>
              )}

              {/* Remove */}
              <button
                onClick={() => removeFile(index)}
                className="absolute top-1 right-1 bg-black text-white rounded-full p-1"
              >
                <IoClose size={12} />
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Input Row */}
      <div className="flex items-center gap-3">
        <input
          type="text"
          placeholder="Message..."
          className="flex-1 bg-transparent px-2 py-2 outline-none 
          text-zinc-100 placeholder-zinc-500 text-sm"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
        />

        {/* Emoji */}
        <BsEmojiGrin
          size={20}
          onClick={() => setShowEmoji((prev) => !prev)}
          className="cursor-pointer text-zinc-400 hover:text-white"
        />

        {showEmoji && (
          <EmojiPicker
            onSelect={(emoji) => {
              setContent((prev) => prev + emoji);
              setShowEmoji(false);
            }}
          />
        )}

        {/* Hidden input */}
        <input
          type="file"
          multiple
          ref={fileInputRef}
          className="hidden"
          onChange={handleFileChange}
        />

        {/* Upload */}
        <FaFolderPlus
          size={20}
          onClick={() => fileInputRef.current?.click()}
          className="cursor-pointer text-zinc-400 hover:text-white"
        />

        {/* Send */}
        <MdSend
          size={22}
          onClick={handleSend}
          className={`cursor-pointer ${
            loading ? "opacity-50" : "hover:text-white"
          }`}
        />
      </div>
    </div>
  );
};

export default InputBar;
