import { RadioGroup, Radio } from '@nextui-org/react'
import { useDarkMode } from 'usehooks-ts'
import { useGetUserPrefence } from '../../api/settingsApis'
import toast from 'react-hot-toast'
import { useForm } from 'react-hook-form'
import { useEffect, useContext, useState } from 'react'
import {
  AppearanceContext,
  SetAppearanceContext,
} from '../../providers/AppearanceProvider'
import API from '../../services/AxiosInstance'
import Loader from '../Loader'
import { useLightPref, useDarkPref } from '../../hooks/usePref'
import Cookies from 'js-cookie';

export default function PrefrenceForm() {
  const { isLoading } = useGetUserPrefence()

  return (
    <>
      {isLoading ? (
        <div className='min-h-screen mx-auto'>
          <Loader />
        </div>
      ) : (
        <PrefrenceFormContent />
      )}
    </>
  )
}

function PrefrenceFormContent() {
  const { data: userPrefrence } = useGetUserPrefence()

  const userPrefrences = useContext(AppearanceContext)
  const setPrefrence = useContext(SetAppearanceContext)
  const system = window.matchMedia('(prefers-color-scheme: light)')
  const { setValue, watch } = useForm({
    defaultValues: {
      appearance: userPrefrences || userPrefrence?.appearance ||  'system',
    },
  })

 

  const handleToggleDarkMode = (prefOption) => {
    // toggleDarkMode()
    setValue('appearance', prefOption)
    if (prefOption === 'dark') {
      useDarkPref()
      API.post('/settings/preferences', {
        setting_name: 'appearance',
        value: 'dark',
      })
        .then(
          (response) => {
            // toast.success(response.data?.message)
            useDarkPref()
            setPrefrence('dark')
            Cookies.set('appearance', 'dark')
          }
        )
        .catch(
          (error) => {
            // toast.error(error.response?.data?.message ?? error.message)
            useLightPref()
            }
          )
    } else if (prefOption === 'light') {
      useLightPref()
      API.post('/settings/preferences', {
        setting_name: 'appearance',
        value: 'light',
      })
        .then(
          (response) => {
            toast.success(response.data?.message)
            useLightPref()
            setPrefrence('light')
            Cookies.set('appearance', 'light')
          }
        )
        .catch(
          (error) => {
            toast.error(error.response?.data?.message ?? error.message)
            useDarkPref()
            }
          )
    } else if (prefOption === 'system') {
       if(system.matches) {
              useLightPref()
              API.post('/settings/preferences', {
                setting_name: 'appearance',
                value: 'system',
              })
                .then(
                  (response) => {
                    toast.success(response.data?.message)
                    useLightPref()
                    setPrefrence('system')
                    Cookies.set('appearance', 'system')
                  }
                )
                .catch(
                  (error) => {
                    toast.error(error.response?.data?.message ?? error.message)
                    console.error(error.response?.data?.message ?? error.message)
                    useDarkPref()
                    }
                  )
       } else {
              useDarkPref()
              API.post('/settings/preferences', {
                setting_name: 'appearance',
                value: 'system',
              })
                .then(
                  (response) => {
                    toast.success(response.data?.message)
                    useDarkPref()
                    setPrefrence('system')
                    Cookies.set('appearance', 'system')
                  }
                )
                .catch(
                  (error) => {
                    toast.error(error.response?.data?.message ?? error.message)
                    useLightPref()
                    }
                  )
       }
    }
  }

  const appearance = watch('appearance')
  return (
    <div>
        <form>
          <div className='self-stretch grow min-h-screen shrink basis-0 md:px-16 py-6 flex-col justify-start items-start gap-12 flex'>
            <div className='text-sm font-bold font-Manrope'>Appearance</div>
            <div className='self-stretch flex-col justify-start items-start gap-6 flex'>
              <RadioGroup
                label='Select Appearance'
                orientation='vertical'
                color='secondary'
                className='w-full'
                value={appearance}
              >
                <div className='self-stretch py-2 px-2 w-full bg-white hover:text-white bg-opacity-10 rounded justify-start items-center gap-2 inline-flex'>
                  <Radio
                    onClick={() => handleToggleDarkMode('dark')}
                    value='dark'
                    isDisabled={appearance === 'dark'}
                  >
                    Dark Mode
                  </Radio>
                </div>

                <div className='self-stretch py-2 px-2 w-full bg-white hover:text-white bg-opacity-10 rounded justify-start items-center gap-2 inline-flex'>
                  <Radio
                    onClick={() => handleToggleDarkMode('light')}
                    value='light'
                    isDisabled={appearance === 'light'}
                  >
                    Light Mode
                  </Radio>
                </div>
                <div className='self-stretch py-2 px-2 w-full bg-white hover:text-white bg-opacity-10 rounded justify-start items-center gap-2 inline-flex'>
                  <Radio
                    onClick={() => handleToggleDarkMode('system')}
                    value='system'
                    isDisabled={appearance === 'system'}
                  >
                    System Settings
                  </Radio>
                </div>
              </RadioGroup>
            </div>
          </div>
        </form>
    </div>
  )
}
