import { create } from "zustand";
import toast from "react-hot-toast";
import { axiosInstance } from "../lib/axios";

export const useChatStore = create((set, get) => ({
  messages: [],
  users: [],
  selectedUser: null,
  isUserLoading: false,
  isMessageLoading: false,

  getUsers: async () => {
    set({ isUserLoading: true });
    try {
      const response = await axiosInstance.get("/messages/users");
      set({ users: response.data, isUserLoading: false });
    } catch {
      set({ isUserLoading: false });
      toast.error("Failed to load users");
    }
  },

  getMessages: async (userId) => {
    set({ isMessageLoading: true });
    try {
      const response = await axiosInstance.get(`/messages/${userId}`);
      set({ messages: response.data.messages, isMessageLoading: false });
    } catch {
      set({ isMessageLoading: false });
      toast.error("Failed to load messages");
    }
  },

  sendMessage: async (messageData) => {
    const { selectedUser, messages } = get();

    try {
      const res = await axiosInstance.post(
        `/messages/send/${selectedUser._id}`,
        messageData
      );
      set({ messages: [...messages, res.data.newMessage] });
    } catch (error) {
      toast.error(error.response?.data?.error || "Failed to send message");
    }
  },

  setSelectedUser: (selectedUser) => set({ selectedUser }),

  resetChatStore: () =>
    set({
      messages: [],
      users: [],
      selectedUser: null,
      isUserLoading: false,
      isMessageLoading: false,
    }),
}));
