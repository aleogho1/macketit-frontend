/* eslint-disable no-unused-vars */
import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

const useSignUpToken = create(
  persist(
    (set) => ({
      token: null,
      setSignUpToken: (data = {}) => set({ token: data }),
      removeSignUpToken: () => set({ token: null }),
    }),
    {
      name: 'signup_token',
      storage: createJSONStorage(() => localStorage),
    }
  )
)

export default useSignUpToken
