import { create } from "zustand";

export const useDmStore = create((set) => ({
  currentUser: null,
  dms: [],
  onlineUsers: {},
  activeDm: null,
  messages: [],

  setCurrentUser: (user) => set({ currentUser: user }),

  setDms: (dms) => set((state) => {
    // Extract online statuses from the fresh DMs payload into a global map
    const newOnlineMap = { ...state.onlineUsers };
    if (Array.isArray(dms)) {
      dms.forEach(dm => {
        dm.members?.forEach(member => {
          if (member._id) newOnlineMap[member._id] = member.isOnline;
        });
      });
    }
    return { dms: Array.isArray(dms) ? dms : [], onlineUsers: newOnlineMap };
  }),

  setUserOnlineStatus: (userId, isOnline) => set((state) => ({
    onlineUsers: { ...state.onlineUsers, [userId]: isOnline }
  })),

  setActiveDm: (dm) => set((state) => {
    // If dm is null, just close the channel window explicitly
    if (!dm) return { activeDm: null };

    // Reset unread count when opening a DM channel
    const updatedDms = state.dms.map(d => 
      String(d._id) === String(dm.channelId) ? { ...d, unread: 0 } : d
    );
    return { activeDm: dm, dms: updatedDms };
  }),

  setMessages: (messages) =>
    set({
      messages: Array.isArray(messages) ? messages : []
    }),

  addMessage: (message) => set((state) => {
    // Check if the incoming message belongs to our currently active chatting channel
    const isActive = state.activeDm && String(state.activeDm.channelId) === String(message.channelId);

    // Update unread count AND move the active channel to the top of the DMs list!
    const updatedDms = [];
    state.dms.forEach(d => {
      if (String(d._id) === String(message.channelId)) {
        // Target channel gets updated unread count and moved to top! (unshift)
        updatedDms.unshift({ ...d, unread: isActive ? 0 : (d.unread || 0) + 1 });
      } else {
        // Other channels stay in their normal order
        updatedDms.push(d);
      }
    });

    // Only append to the screen if the user is actually looking at that DM
    const newMessages = isActive 
        ? (Array.isArray(state.messages) ? [...state.messages, message] : [message])
        : state.messages;

    return { 
      dms: updatedDms,
      messages: newMessages 
    };
  })
}));
