/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
import { createContext, useState } from 'react'

import { useMediaQuery } from 'react-responsive'

export const dashboardContext = createContext()

const DashboardContext = ({ children }) => {
  let isTablet = useMediaQuery({ query: '(max-width: 1024px)' })
  // let isTablet = useMediaQuery({ query: "(max-width: 768px)" });
  const [sidebarOpen, setSidebarOpen] = useState(isTablet ? false : true)
  const [tabClicked, setTabClicked] = useState('home')
  const [sidebarMinimized, setSidebarMinimized] = useState(false)
  const [showminimizedsubMenu, setShowminimizedsubMenu] = useState(false)
  const [extendedSubMenuData, setExtendedSubMenuData] = useState(null)

  //
  const [tabClickedLV3, setTabClickedLV3] = useState('engage')

  const toggleSideBar = () => {
    setSidebarOpen(true)
  }

  const toggleTab = (name) => {
    console.log(name)
    if (tabClicked === name) {
      setTabClicked(null)
    } else {
      setTabClicked(name)
    }
  }

  const toggleTabLV3 = (name) => {
    console.log(name)
    if (tabClickedLV3 === name) {
      setTabClickedLV3(null)
    } else {
      setTabClickedLV3(name)
    }
  }

  const minimizeSidebar = () => {
    setSidebarMinimized(!sidebarMinimized)

    if (showminimizedsubMenu) {
      setShowminimizedsubMenu(false)
    }
  }

  return (
    <dashboardContext.Provider
      value={{
        sidebarOpen,
        setSidebarOpen,
        toggleSideBar,
        isTablet,
        tabClicked,
        toggleTab,
        toggleTabLV3,
        tabClickedLV3,
        sidebarMinimized,
        minimizeSidebar,
        showminimizedsubMenu,
        setShowminimizedsubMenu,
        extendedSubMenuData,
        setExtendedSubMenuData,
      }}
    >
      {children}
    </dashboardContext.Provider>
  )
}

export default DashboardContext
