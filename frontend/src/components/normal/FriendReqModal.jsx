import React, { useState, useEffect } from "react";
import { IoIosClose } from "react-icons/io";
import axios from "axios";
import { useDmStore } from "../../store/useDmStore";

const FriendReqModal = ({ setView }) => {
  const [username, setUsername] = useState("");
  const [activeTab, setActiveTab] = useState("send");
  const [requests, setRequests] = useState([]);
  const setDms = useDmStore((state) => state.setDms);

  const url = import.meta.env.VITE_BACKEND_URL;
  const fetchDms = async () => {
    try {
      const res = await axios.get(`${url}/channel/dms`, {
        withCredentials: true,
      });

      setDms(res.data);
    } catch (error) {
      console.error("Error fetching DMs:", error);
    }
  };

  const sendFriendReq = async () => {
    if (!username.trim()) {
      alert("Enter username");
      return;
    }

    try {
      await axios.post(
        `${url}/friend/request/${username}`,
        {},
        { withCredentials: true },
      );
      setUsername("");
      alert("Request sent");
    } catch (err) {
      alert("Error sending request");
    }
  };

  const fetchRequests = async () => {
    try {
      const res = await axios.get(`${url}/friend/requests`, {
        withCredentials: true,
      });
      console.log("from inside func:", res.data.data);
      setRequests(res.data.data);
    } catch (error) {
      console.error("Error fetching requests:", error);
    }
  };

  useEffect(() => {
    if (activeTab === "pending") {
      fetchRequests();
    }
  }, [activeTab]);

  const handleAccept = async (requesterId) => {
    try {
      await axios.post(
        `${url}/friend/accept/${requesterId}`,
        {},
        { withCredentials: true },
      );
      setRequests((prev) =>
        prev.filter((req) => req.requester._id !== requesterId),
      );
      await fetchDms();
    } catch (error) {
      console.error("Accept error:", error);
    }
  };

  const handleReject = async (requesterId) => {
    try {
      await axios.post(
        `${url}/friend/reject/${requesterId}`,
        {},
        { withCredentials: true },
      );

      setRequests((prev) =>
        prev.filter((req) => req.requester._id !== requesterId),
      );
    } catch (error) {
      console.error("Reject error:", error);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex justify-center items-center z-50">
      <div className="bg-[#09090b]/80 backdrop-blur-3xl h-auto max-h-[85vh] w-[90%] sm:w-[60%] max-w-2xl rounded-3xl p-8 relative flex flex-col border border-white/[0.05] shadow-[0_8px_32px_0_rgba(0,0,0,0.6)]">
        <button
          onClick={() => setView(false)}
          className="absolute top-5 right-5 text-zinc-500 hover:text-white hover:bg-white/10 rounded-full p-1 transition-all"
        >
          <IoIosClose size={28} />
        </button>

        <h2 className="text-2xl font-black text-white tracking-wide mb-6">
          Friend Requests
        </h2>

        <div className="flex border-b border-white/[0.05] mb-6">
          <button
            onClick={() => setActiveTab("send")}
            className={`flex-1 py-3 text-sm font-semibold tracking-wide transition-all duration-300 ease-out ${
              activeTab === "send"
                ? "text-white border-b-2 border-white"
                : "text-zinc-500 hover:text-zinc-300"
            }`}
          >
            Send Request
          </button>

          <button
            onClick={() => setActiveTab("pending")}
            className={`flex-1 py-3 text-sm font-semibold tracking-wide transition-all duration-300 ease-out ${
              activeTab === "pending"
                ? "text-white border-b-2 border-white"
                : "text-zinc-500 hover:text-zinc-300"
            }`}
          >
            Pending Requests
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-2">
          {activeTab === "send" && (
            <div className="flex flex-col pt-8 h-full max-w-md mx-auto w-full">
              <input
                type="text"
                placeholder="Enter username"
                className="px-5 py-4 rounded-2xl outline-none border border-white/[0.05] bg-white/[0.02] text-zinc-100 focus:border-white/20 focus:bg-white/[0.05] transition-all font-medium placeholder-zinc-500/80 tracking-wide"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />

              <div className="my-4" />

              <button
                className="bg-white/10 hover:bg-white/20 border border-white/10 text-white py-4 rounded-2xl hover:-translate-y-0.5 transition-all active:scale-95 font-semibold tracking-widest uppercase text-sm"
                onClick={sendFriendReq}
              >
                Send Request
              </button>
            </div>
          )}

          {activeTab === "pending" && (
            <div className="space-y-4 pt-2">
              {requests.length === 0 ? (
                <div className="flex flex-col items-center justify-center mt-20 text-zinc-500">
                  <p className="text-lg font-medium">No pending requests</p>
                  <p className="text-sm mt-1">You're all caught up!</p>
                </div>
              ) : (
                requests.map((req) => (
                  <div
                    key={req._id}
                    className="flex items-center justify-between bg-white/[0.02] border border-white/[0.05] p-4 rounded-2xl shadow-sm hover:bg-white/[0.04] transition-colors"
                  >
                    <span className="text-zinc-200 font-medium text-lg tracking-wide pl-2">
                      {req.requester.username}
                    </span>

                    <div className="flex gap-3">
                      <button
                        onClick={() => handleAccept(req.requester._id)}
                        className="bg-green-500/20 text-green-400 hover:bg-green-500/30 border border-green-500/30 px-5 py-2 text-sm font-semibold rounded-xl transition-all active:scale-95"
                      >
                        Accept
                      </button>

                      <button
                        onClick={() => handleReject(req.requester._id)}
                        className="bg-red-500/20 text-red-400 hover:bg-red-500/30 border border-red-500/30 px-5 py-2 text-sm font-semibold rounded-xl transition-all active:scale-95"
                      >
                        Reject
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FriendReqModal;
