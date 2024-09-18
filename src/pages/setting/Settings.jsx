import { AnimatePresence, motion } from 'framer-motion'
import { Tab, Tabs } from '@nextui-org/tabs'
import { useEffect, useState } from 'react'
import GeneralForm from './GeneralForm'
import SecuretyForm from './SecuretyForm'
import NotificationForm from './NotificationForm'
import BankDetailsForm from './BankDetailsForm'
import PrefrenceForm from './PrefrenceForm'
import SocialAccount from './SocialAccount'
import { useLocation, useNavigate } from 'react-router-dom'

export default function Settings() {
  const settingsTab = [
    'General',
    'Security',
    'Notifications',
    'Bank Details',
    'Social Account',
    'Preferences',
  ]
  const [selected, setSelected] = useState(settingsTab[0])
  const location = useLocation()
  const navigate = useNavigate()
  const setTab = () => {
    {
      selected === 'General' &&
        ((location.search = '?tab=general'),
        navigate('/dashboard/settings/?tab=general'))
    }
    {
      selected === 'Security' &&
        ((location.search = '?tab=security'),
        navigate('/dashboard/settings/?tab=security'))
    }
    {
      selected === 'Notifications' &&
        ((location.search = '?tab=notifications'),
        navigate('/dashboard/settings/?tab=notifications'))
    }
    {
      selected === 'Bank Details' &&
        ((location.search = '?tab=bank-details'),
        navigate('/dashboard/settings/?tab=bank-details'))
    }
    {
      selected === 'Social Account' &&
        ((location.search = '?tab=social-account'),
        navigate('/dashboard/settings/?tab=social-account'))
    }
    {
      selected === 'Preferences' &&
        ((location.search = '?tab=preferences'),
        navigate('/dashboard/settings/?tab=preferences'))
    }
  }
  useEffect(() => {
    location.search === '?tab=notifications' ? setSelected('Notifications') : ''
  }, [])

  return (
    <div>
      <div className=' w-full p-3 min-h-screen bg-white dark:bg-neutral-900 flex-col justify-start items-start gap-3 inline-flex'>
        <div className='self-stretch px-4 md:px-0 grow shrink basis-0 flex-col justify-start items-start gap-4 flex'>
          <div className='self-stretch py-3 justify-start items-start gap-2 inline-flex'>
            <div className="text-black dark:text-white text-2xl font-medium font-['Manrope']">
              Profile Settings
            </div>
          </div>
          <div className='self-stretch overflow-auto borderb borderstone-900 justify-between items-center inline-flex'>
            <div className='justify-start items-center gap-[11px] flex'>
              <AnimatePresence mode='wait'>
                <div className='flex flex-col w-full'>
                  <Tabs
                    fullWidth
                    size='md'
                    aria-label='Tabs form'
                    selectedKey={selected}
                    onSelectionChange={setSelected}
                    onClick={() => setTab()}
                    variant='underlined'
                    classNames={{
                      tabList: '  bordered py-2',
                      cursor: ' primaryBg',
                      tabContent:
                        'group-data-[selected=true]:text-primaryText ',
                    }}
                    className="text-center overflow-auto text-[#CB29BE]   text-xs font-bold font-['Manrope']"
                    color='secondary'
                  >
                    <Tab
                      key='General'
                      className=" text-zinc-400 text-[12.83px] font-bold font-['Manrope']"
                      title='General'
                    ></Tab>
                    <Tab
                      key='Security'
                      className=" text-zinc-400 text-[12.83px] font-bold font-['Manrope']"
                      title='Security'
                    ></Tab>
                    <Tab
                      key='Notifications'
                      className=" text-zinc-400 text-[12.83px] font-bold font-['Manrope']"
                      title='Notifications'
                    ></Tab>
                    <Tab
                      key='Bank Details'
                      title='Bank details'
                      className=" text-zinc-400 text-[12.83px] font-bold font-['Manrope']"
                    ></Tab>
                    <Tab
                      key='Social Account'
                      title='Social Account'
                      className=" text-zinc-400 text-[12.83px] font-bold font-['Manrope']"
                    ></Tab>
                    <Tab
                      key='Preferences'
                      title='Preferences'
                      className=" text-zinc-400 text-[12.83px] font-bold font-['Manrope']"
                    ></Tab>
                  </Tabs>
                </div>
              </AnimatePresence>
            </div>
            {/* <div className='p-2 justify-center items-center gap-1 flex'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                width='18'
                height='19'
                viewBox='0 0 18 19'
                fill='none'
              >
                <path
                  d='M15 5.75L7.10355 13.6464C6.90829 13.8417 6.59171 13.8417 6.39645 13.6464L3 10.25'
                  className='dark:stroke-[#FFD0FE] stroke-[#FF6DFB] '
                  strokeLinecap='round'
                />
              </svg>
              <div className="text-center text-primaryText dark:text-fuchsia-200 text-[12.83px] font-bold font-['Manrope']">
                Save
              </div>
            </div> */}
          </div>

          {selected === 'General' && (
            <motion.div
              initial={{ x: 100 }}
              animate={{ x: 0 }}
              className='flex flex-col gap-2 w-full'
              transition={{
                rotate: { duration: 2 },
                scale: { duration: 0.4 },
              }}
            >
              <GeneralForm />
            </motion.div>
          )}
          {selected === 'Security' && (
            <motion.div
              initial={{ x: 100 }}
              animate={{ x: 0 }}
              className='flex flex-col gap-2 w-full'
              transition={{
                rotate: { duration: 2 },
                scale: { duration: 0.4 },
              }}
            >
              <SecuretyForm />
            </motion.div>
          )}
          {selected === 'Notifications' && (
            <motion.div
              initial={{ x: 100 }}
              animate={{ x: 0 }}
              className='flex flex-col gap-2 w-full'
              transition={{
                rotate: { duration: 2 },
                scale: { duration: 0.4 },
              }}
            >
              <NotificationForm />
            </motion.div>
          )}
          {selected === 'Social Account' && (
            <motion.div
              initial={{ x: 100 }}
              animate={{ x: 0 }}
              className='flex flex-col gap-2 w-full'
              transition={{
                rotate: { duration: 2 },
                scale: { duration: 0.4 },
              }}
            >
              <SocialAccount />
            </motion.div>
          )}
          {selected === 'Bank Details' && (
            <motion.div
              initial={{ x: 100 }}
              animate={{ x: 0 }}
              className='flex flex-col gap-2 w-full'
              transition={{
                rotate: { duration: 2 },
                scale: { duration: 0.4 },
              }}
            >
              <BankDetailsForm />
            </motion.div>
          )}
          {selected === 'Preferences' && (
            <motion.div
              initial={{ x: 100 }}
              animate={{ x: 0 }}
              className='flex flex-col gap-2 w-full'
              transition={{
                rotate: { duration: 2 },
                scale: { duration: 0.4 },
              }}
            >
              <PrefrenceForm />
            </motion.div>
          )}
        </div>
      </div>
    </div>
  )
}
