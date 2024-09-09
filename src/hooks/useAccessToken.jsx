/* eslint-disable no-unused-vars */
import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

const useAccessToken = create(
  persist(
    (set) => ({
      accessToken: null,
      setAccessToken: (data = {}) => set({ token: data }),
      removeAccessToken: () => set({ token: null }),
    }),
    {
      name: 'access_token',
      storage: createJSONStorage(() => localStorage),
    }
  )
)

export default useAccessToken
