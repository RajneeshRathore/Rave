import { create } from "zustand";

export const useDmStore = create((set) => ({
  currentUser: null,
  dms: [],
  onlineUsers: {},
  activeDm: null,
  messages: [],

  setCurrentUser: (user) => set({ currentUser: user }),

  setDms: (dms) => set((state) => {
    // extract online details for new dms and put into map
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
    // if dm is null  close the channel window
    if (!dm) return { activeDm: null };

    // reset unread when open dm
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
    // check incoming msg belong to current dm 
    const isActive = state.activeDm && String(state.activeDm.channelId) === String(message.channelId);

    //update msg cound and move active channel to top of list
    const updatedDms = [];
    state.dms.forEach(d => {
      if (String(d._id) === String(message.channelId)) {
        updatedDms.unshift({ ...d, unread: isActive ? 0 : (d.unread || 0) + 1 });
      } else {
        // other channels stay in their place
        updatedDms.push(d);
      }
    });

    // append to the screen if the dm is opened
    const newMessages = isActive
      ? (Array.isArray(state.messages) ? [...state.messages, message] : [message])
      : state.messages;

    return {
      dms: updatedDms,
      messages: newMessages
    };
  })
}));
