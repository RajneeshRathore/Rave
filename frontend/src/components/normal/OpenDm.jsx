import { useEffect, useRef,useState } from "react";
import InputBar from "./InputBar";
import Message from "./Message";
import { useDmStore } from "../../store/useDmStore";
import { IoIosCloseCircleOutline } from "react-icons/io";
import axios from "axios";
import { socket } from "../../socket";
import { optimizeAvatar } from "../../utils/optimizeAvatar";

const OpenDm = () => {
  const activeDm = useDmStore((state) => state.activeDm);
  const setActiveDm = useDmStore((state) => state.setActiveDm);
  const messages = useDmStore((state) => state.messages);
  const setMessages = useDmStore((state) => state.setMessages);
  const onlineUsers = useDmStore((state) => state.onlineUsers);
  // const addMessage = useDmStore((state) => state.addMessage);
  // const currentUser=useDmStore((state)=>state.currentUser);
  const [loading, setLoading] = useState(true);

  const bottomRef = useRef(null);

  useEffect(() => {
  if (!activeDm?.channelId) {
    setMessages([]);
    return;
  }


  const fetchMessages = async () => {
    try {
      setLoading(true);

      const url = import.meta.env.VITE_BACKEND_URL;

      const res = await axios.get(
        `${url}/message/${activeDm.channelId}`,
        { withCredentials: true }
      );

      const data = res.data?.data || res.data || [];
      setMessages(Array.isArray(data) ? data : []);

    } catch (error) {
      console.error("Fetch messages error:", error);
    } finally {
      setLoading(false);
    }

    // Clear notifications in the backend since user just viewed the channel
    try {
      const url = import.meta.env.VITE_BACKEND_URL;
      await axios.delete(`${url}/channel/notifications/${activeDm.channelId}`, { withCredentials: true });
    } catch (err) {
      console.error("Failed to clear notifications:", err);
    }
  };

  fetchMessages();
  
  socket.emit("join_channel", {
    channelId: activeDm.channelId,
  });

  return () => {
    socket.emit("leave_channel", {
      channelId: activeDm.channelId,
    });
  };
}, [activeDm?.channelId]);
  

 useEffect(() => {
  bottomRef.current?.scrollIntoView({ behavior: "auto" });
}, [messages]);

  if (!activeDm) return null;

  return (
    <div className="h-full w-full flex justify-center items-center text-white">

      {/* FLAT CHAT CONTAINER */}
      <div className="w-full h-full flex flex-col bg-transparent">

        {/* HEADER */}
        <div
          className="flex items-center justify-between px-6 py-4
          border-b border-white/[0.05]
          bg-white/[0.02]"
        >

          <div className="flex items-center gap-4">

            <div className="relative">
              <img
                src={optimizeAvatar(activeDm.avatarUrl)}
                alt={activeDm.username}
                className={`h-10 w-10 rounded-full object-cover transition duration-300 ${!onlineUsers[activeDm._id] && 'opacity-60 grayscale-[50%]'}`}
              />
              {onlineUsers[activeDm._id] && (
                <span className="absolute bottom-0 right-0 h-3 w-3 bg-green-400 rounded-full border border-black"></span>
              )}
            </div>

            <div>
              <h1 className="font-semibold text-lg tracking-wide">
                {activeDm.username}
              </h1>
              {onlineUsers[activeDm._id] ? (
                 <p className="text-xs text-green-400">online</p>
              ) : (
                 <p className="text-xs text-gray-500">offline</p>
              )}
            </div>

          </div>

          <IoIosCloseCircleOutline
            size={28}
            className="cursor-pointer text-zinc-500 hover:text-red-400 transition"
            onClick={() => {
              socket.emit("leave_channel", {
                channelId: activeDm.channelId
              });
              setActiveDm(null);
              setMessages([]);
            }}
          />

        </div>

        {/* MESSAGES */}
        <div className="flex-1 overflow-y-auto px-8 py-6 space-y-4 bg-transparent">

          {loading ? (
  <div className="flex items-center justify-center h-full text-gray-400">
    Loading messages...
  </div>
) : messages.length === 0 ? (
  <div className="h-full flex flex-col justify-center items-center text-gray-300">

    <div className="text-5xl mb-4 opacity-60">
      💬
    </div>

    <p className="text-lg">No messages yet</p>
    <p className="text-sm mt-1 text-gray-400">
      Start the conversation
    </p>

  </div>
) : (
  messages.map((item) => (
    <Message key={item._id} message={item} />
  ))
)}
          <div ref={bottomRef} />

        </div>

        {/* INPUT */}
        <div className="px-6 py-4 mt-auto">
          <div className="bg-white/[0.03] backdrop-blur-md rounded-2xl p-1 border border-white/[0.05] focus-within:border-white/20 focus-within:bg-white/[0.05] transition-all duration-300">
            <InputBar />
          </div>
        </div>

      </div>

    </div>
  );
};

export default OpenDm;

