import { Image } from '@nextui-org/react'
// import logo from '../assets/Logo_Default.svg'
import logo from '../assets/macketIt-logo.png'

export default function Logo() {
  // useEffect(() => {

  // }, [userPrefrences])
  return (
    <div>
      <div>
        <Image className='w-[10rem] md:wfull ml-3' src={logo} />
      </div>
    </div>
  )
}
