/* eslint-disable react/prop-types */
// aosInitializer.js
import AOS from 'aos'
import 'aos/dist/aos.css'

const AOSInitializer = ({ children }) => {
  AOS.init()

  return <div>{children}</div>
}

export default AOSInitializer
