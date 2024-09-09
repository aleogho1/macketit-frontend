/* eslint-disable react/prop-types */
import { createContext, useState } from 'react'
// import { useUpdateUserPrefence } from "../api/settingsApis"
// import toast from "react-hot-toast"

export const AppearanceContext = createContext()
export const SetAppearanceContext = createContext()
const AppearanceProvider = ({ children }) => {
  // const { mutateAsync: updateUserPrefence } = useUpdateUserPrefence()
  const [prefrence, setPrefrence] = useState()
  const setUserPrefrence = (prefOption) => {
    setPrefrence(prefOption)
    // try {
    //     const res = await updateUserPrefence({ appearance: prefOption })
    //     if (res?.data?.status) {
    //       toast.success(res.data.message)
    //     }
    // } catch (error) {
    //     toast.error(error.response?.data?.message ?? error.message)
    // }
  }
  return (
    <AppearanceContext.Provider value={prefrence}>
      <SetAppearanceContext.Provider value={setUserPrefrence}>
        {children}
      </SetAppearanceContext.Provider>
    </AppearanceContext.Provider>
  )
}
export default AppearanceProvider
