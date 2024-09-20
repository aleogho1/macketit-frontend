// src/store/useAuthStore.js
import create from 'zustand'
import { persist } from 'zustand/middleware'

const useAuthStore = create(
  persist(
    (set) => ({
      isAuthenticated: false,
      user: null,
      accessToken: null,
      login: (userData, token) =>
        set({ isAuthenticated: true, user: userData, accessToken: token }),
      logout: () =>
        set({ isAuthenticated: false, user: null, accessToken: null }),
    }),
    {
      name: 'auth-storage', // unique name
      getStorage: () => localStorage, // (optional) by default, 'localStorage' is used
    }
  )
)

export default useAuthStore
