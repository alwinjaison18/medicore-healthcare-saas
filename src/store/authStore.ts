import type { User } from "firebase/auth";
import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface AuthUser {
  readonly uid: string;
  readonly email: string | null;
  readonly displayName: string | null;
}

interface AuthState {
  readonly user: AuthUser | null;
  readonly isLoading: boolean;
  readonly error: string | null;
  setUser: (user: AuthUser | null) => void;
  setLoading: (value: boolean) => void;
  setError: (error: string | null) => void;
  logout: () => void;
}

export function mapFirebaseUser(user: User | null): AuthUser | null {
  if (!user) {
    return null;
  }

  return {
    uid: user.uid,
    email: user.email,
    displayName: user.displayName,
  };
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isLoading: true,
      error: null,
      setUser: (user) => {
        set({ user, isLoading: false, error: null });
      },
      setLoading: (value) => {
        set({ isLoading: value });
      },
      setError: (error) => {
        set({ error, isLoading: false });
      },
      logout: () => {
        set({ user: null, error: null, isLoading: false });
      },
    }),
    {
      name: "medicore-auth",
      partialize: (state) => ({ user: state.user }),
    },
  ),
);
