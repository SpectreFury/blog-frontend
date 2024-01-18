import { create } from "zustand";

interface UserStore {
  user: User | null;
  setUser: (id: string, email: string, isAdmin: boolean) => void;
}

export type User = {
  id: string;
  email: string;
  isAdmin: boolean;
};

const useUserStore = create<UserStore>((set) => ({
  user: null,
  setUser: (id: string, email: string, isAdmin: boolean) =>
    set((state) => ({
      user: {
        id,
        email,
        isAdmin,
      },
    })),
}));

export { useUserStore };
