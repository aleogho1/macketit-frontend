/* eslint-disable no-unused-vars */
import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

const useResetToken = create(
  persist(
    (set) => ({
      token: null,
      setResetToken: (data = {}) => set({ token: data }),
      removeResetToken: () => set({ token: null }),
    }),
    {
      name: 'resetToken',
      storage: createJSONStorage(() => localStorage),
    }
  )
)

export default useResetToken
