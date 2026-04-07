import React, { useState, useMemo } from "react";
import Nameplate from "./Nameplate";
import FriendReqModal from "./FriendReqModal";
import { IoPersonAddSharp } from "react-icons/io5";
import { useDmStore } from "../../store/useDmStore";

const FriendSection = () => {
  const [view, setView] = useState(false);
  const [viewPending, setViewPending] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const dms = useDmStore((state) => state.dms);
  const currentUser = useDmStore((state) => state.currentUser);
  const onlineUsers = useDmStore((state) => state.onlineUsers);
  const setActiveDm = useDmStore((state) => state.setActiveDm);

  const friendsList = useMemo(() => {
    if (!currentUser || !dms) return [];

    return dms.map(dm => {
      const otherUser = dm.members?.find(m => m._id !== currentUser._id);
      if (!otherUser) return null;
      return { ...otherUser, channelId: dm._id, unread: dm.unread || 0 };
    }).filter(Boolean);
  }, [dms, currentUser]);

  const filteredFriends = useMemo(() => {
    if (!searchQuery.trim()) return friendsList;
    return friendsList.filter(f => f.username.toLowerCase().includes(searchQuery.toLowerCase()));
  }, [friendsList, searchQuery]);

  const onlineFriends = filteredFriends.filter(f => onlineUsers[f._id]);
  const offlineFriends = filteredFriends.filter(f => !onlineUsers[f._id]);
  return (
    <div className="h-full w-full flex flex-col text-white bg-transparent">

      <div className="border-b border-white/[0.05] bg-white/[0.02] flex px-8 py-6 items-center justify-between">
        <div className="w-[40%]">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-full px-5 py-2 text-zinc-200 bg-white/[0.03] border border-white/[0.05] focus:border-white/20 focus:bg-white/[0.05] focus:outline-none transition-all placeholder-zinc-500 font-medium"
            placeholder="Search friends..."
          />
        </div>

        <button
          onClick={() => setView(true)}
          className="flex items-center gap-2 bg-white/10 hover:bg-white/20 border border-white/10 text-white px-4 py-2 rounded-xl hover:-translate-y-0.5 transition-all active:scale-95 font-semibold tracking-wide"
        >
          <IoPersonAddSharp size={20} />
          <span>Add Friend</span>
        </button>
      </div>

      <div className="flex-1 overflow-y-auto px-8 py-6 flex flex-col gap-8">


        {onlineFriends.length > 0 && (
          <div className="flex flex-col gap-3">
            <h2 className="text-xs font-black tracking-[0.2em] text-white uppercase">
              Online — {onlineFriends.length}
            </h2>
            <div className="flex flex-col gap-1 w-full max-w-lg">
              {onlineFriends.map(friend => (
                <Nameplate
                  key={friend._id}
                  item={friend}
                  openDm={() => setActiveDm(friend)}
                />
              ))}
            </div>
          </div>
        )}

        {/* all friends */}
        {offlineFriends.length > 0 && (
          <div className="flex flex-col gap-3">
            <h2 className="text-xs font-black tracking-[0.2em] text-zinc-500 uppercase">
              Offline — {offlineFriends.length}
            </h2>
            <div className="flex flex-col gap-1 w-full max-w-lg">
              {offlineFriends.map(friend => (
                <Nameplate
                  key={friend._id}
                  item={friend}
                  openDm={() => setActiveDm(friend)}
                />
              ))}
            </div>
          </div>
        )}

        {/* no friends */}
        {filteredFriends.length === 0 && (
          <div className="flex flex-col items-center justify-center mt-20 text-zinc-500">
            <p className="text-lg font-medium">No friends found</p>
            {searchQuery && <p className="text-sm">Try a different search term</p>}
          </div>
        )}
      </div>

      {view && <FriendReqModal setView={setView} />}
      {viewPending && <PendingReqModal setView={setViewPending} />}
    </div>
  );
};

export default FriendSection;
