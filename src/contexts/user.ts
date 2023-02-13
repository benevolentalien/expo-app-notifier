import { create } from "zustand";

interface UserState {
  token?: string;
  setToken: (token?: string) => void;
}

export const useUserStore = create<UserState>()((set) => ({
  token: undefined,
  setToken: (token) => set({ token }),
}));
