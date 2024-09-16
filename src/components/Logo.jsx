import { Image } from '@nextui-org/react'
// import logo from '../assets/Logo_Default.svg'
import logo from '../assets/macketIt-logo.png'
import { useContext } from 'react'
import { AppearanceContext } from '../providers/AppearanceProvider'
import Cookies from 'js-cookie'

export default function Logo() {
  const userPrefrences = useContext(AppearanceContext)

  // useEffect(() => {

  // }, [userPrefrences])
  return (
    <div>
      <div>
        {userPrefrences === 'dark' ||
        Cookies.get('appearance') === 'dark' ||
        userPrefrences === 'system' ? (
          <Image className='w-[10rem] md:wfull ml-3' src={logo} />
        ) : (
          <Image className='w-[10rem] md:wfull ml-3' src={logo} />
        )}
      </div>
    </div>
  )
}

{
  /* import { useDarkMode } from 'usehooks-ts'
import { AppearanceContext} from '../providers/AppearanceProvider'
import { useContext } from 'react' */
}

{
  /* export default function Logo() {
  const { isDarkMode } = useDarkMode(false)
  const apperance = useContext(AppearanceContext)

  return (
    <div>
      {apperance === 'dark' ? (
        <Image className='w-20 md:w-full ml-3' src={logo} />
      ) : (
        <Image className='w-20 md:w-full ml-3' src={lightLogo} />
      )}
    </div>
  )
} */
}
