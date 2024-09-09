import { Image } from '@nextui-org/react'
import logo from '../assets/Logo_Default.svg'
import lightLogo from '../assets/light_Logo.svg'
import { useContext, useEffect, useState } from 'react'
import {
  AppearanceContext,
  SetAppearanceContext,
} from '../providers/AppearanceProvider'
import API from '../services/AxiosInstance'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import Cookies from 'js-cookie';

export default function Logo() {
  const userPrefrences = useContext(AppearanceContext)
  const setPrefrence = useContext(SetAppearanceContext)
  const navigate = useNavigate()

  // useEffect(() => {
   
  // }, [userPrefrences])
  const system = window.matchMedia('(prefers-color-scheme: light)')
  return (
    <div>
      <div>
        {userPrefrences === 'dark' || Cookies.get('appearance') === 'dark' || userPrefrences === 'system' ? (
          <Image className='w-20 md:w-full ml-3' src={logo} />
        ) : (
          <Image className='w-20 md:w-full ml-3' src={lightLogo} />
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
