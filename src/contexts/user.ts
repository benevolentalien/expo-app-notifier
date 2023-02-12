import { MeQuery } from "@/graphql/__generated__";
import { create } from "zustand";

interface UserState {
  token?: string;
  id?: string;
  setToken: (token?: string) => void;
  setId: (id?: string) => void;
}

export const useUserStore = create<UserState>()((set) => ({
  token: undefined,
  setToken: (token) => set({ token }),
  setId: (id) => set({ id }),
}));
