// import { useEffect } from 'react'
// import useLocalStorage from './useLocalStorage'

// const useColorMode = () => {
//   // Retrieve color mode from local storage, default to 'light' if not present
//   const [colorMode, setColorMode] = useLocalStorage('color-theme', 'light')

//   useEffect(() => {
//     console.log(colorMode)
//     const className = 'dark'
//     const bodyClass = window.document.body.classList

//     // Check if colorMode is defined before applying changes
//     if (colorMode) {
//       // Add or remove 'dark' class based on color mode
//       colorMode === 'dark'
//         ? bodyClass.add(className)
//         : bodyClass.remove(className)
//     } else {
//       // Handle the case when colorMode is undefined (for debugging purposes)
//       console.error('Color mode is undefined')
//     }
//   }, [colorMode])

//   return [colorMode, setColorMode]
// }

// export default useColorMode

import { useLocalStorage } from 'usehooks-ts'

const useColorMode = () => {
  // Retrieve color mode from local storage, default to 'light' if not present
  // const [colorMode, setColorMode] = useLocalStorage('color-mode', 'light')
  const [colorMode, setColorMode] = useLocalStorage('color-theme', 'light')
  // const className = 'dark'
  // const bodyClass = window.document.body.classList
  // Function to toggle between light and dark mode
  const toggleColorMode = () => {
    // setColorMode((prevMode) =>
    //   prevMode === 'light'
    //     ? bodyClass.add(className)
    //     : bodyClass.remove(className)
    // )
    setColorMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'))
  }

  return [colorMode, toggleColorMode]
}

export default useColorMode
