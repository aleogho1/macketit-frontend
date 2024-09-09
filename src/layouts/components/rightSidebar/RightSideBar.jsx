/* eslint-disable no-irregular-whitespace */
/* eslint-disable react/prop-types */

import { Button } from '@nextui-org/button'
import { Input } from '@nextui-org/input'
import { Tab, Tabs } from '@nextui-org/tabs'
import { useState } from 'react'
import ActivitiesCard from './ActivitiesCard'
import MessageCard from './MessageCard'
import NotificationCard from './NotificationCard'
import { AnimatePresence, motion } from 'framer-motion'
import { SearchIcon } from 'lucide-react'
import { Chip } from '@nextui-org/chip'
import {
  useGetActivities,
  useGetMessages,
  useGetNotification,
  useGlobalSearch,
} from '../../../api/notificationApi'
import { Controller, useForm } from 'react-hook-form'
import toast from 'react-hot-toast'

export default function RightSidebar() {
  const [selected, setSelected] = useState('activities')
  const { data: notification } = useGetNotification()
  const { data: messages } = useGetMessages()
  const { data: activities } = useGetActivities()
  const { handleSubmit, control } = useForm({})

  const { mutateAsync: globalSearch } = useGlobalSearch()

  const onSubmit = async (data) => {
    console.log(data)
    try {
      const res = await globalSearch({ data })
      if (res?.data?.status) {
        console.log(res)
      }
    } catch (error) {
      toast.error(error?.response?.message || error?.message)
    }
  }

  return (
    <>
      <div className='flex-col dark:border-0 dark:bg-[#161616] min-h-full justify-start items-start flex'>
        <div className=' py-3  bg-lighten dark:bg-[#161616]  flex-col justify-start items-start gap-2 flex'>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className='self-stretch w-96 flex-col justify-start items-start gap-2 flex'>
              <div className='self-stretch px-3 py-3  bglighten dark:bgzinc-900 rounded justify-start items-center gap-2 inline-flex'>
                <Controller
                  name='query'
                  control={control}
                  render={({ field }) => (
                    <Input
                      size='sm'
                      classNames={{
                        input: [
                          'bg-transparent',
                          'text-black/90 dark:text-white/90',
                          'placeholder:text-default-700/50 dark:placeholder:text-white/60',
                        ],
                        innerWrapper: 'bg-transparent',
                        inputWrapper: [
                          'bg-default-200/50',
                          'dark:bg-default/60',
                          'backdrop-blur-xl',
                          'backdrop-saturate-200',
                          'hover:bg-default-200/70',
                          'dark:hover:bg-default/70',
                          'group-data-[focused=true]:bg-default-200/50',
                          'dark:group-data-[focused=true]:bg-default/60',
                          '!cursor-text',
                        ],
                      }}
                      className="text-center rounded-none text-black text-sm font-medium font-['Campton']"
                      placeholder='search...'
                      startContent={
                        <SearchIcon className='text-black mb-0.5 dark:text-white/90 pointer-events-none flex-shrink-0' />
                      }
                      {...field}
                      isClearable={true}
                    />
                  )}
                />
              </div>
            </div>
          </form>

          <AnimatePresence mode='wait'>
            <div className='flex flex-col w-full'>
              <Tabs
                fullWidth
                size='md'
                aria-label='Tabs form'
                selectedKey={selected}
                onSelectionChange={setSelected}
                variant='underlined'
                classNames={{
                  tabList: '  bordered  py-2',
                  cursor: ' bg-[#FF6DFB]',
                  tabContent:
                    'group-data-[selected=true]:text-[#FF6DFB]  dark:group-data-[selected=true]:text-[#FF6DFB] ',
                }}
                className="text-center text-[#FF6DFB] overflow-auto dark:text-[#FF6DFB] text-[12.83px] font-bold font-['Campton']"
                // color='secondary'
              >
                <Tab key='activities' title='Activities'>
                  <motion.div
                    initial={{ x: 100 }}
                    animate={{ x: 0 }}
                    className='flex flex-col gap-2'
                    transition={{
                      rotate: { duration: 2 },
                      scale: { duration: 0.4 },
                    }}
                  >
                    <ActivitiesCard />
                    {activities?.length > 8 && (
                      <Button
                        variant='light'
                        className="text-center  bg-none mx-auto px-2 py-3 justify-center items-center gap-1 inline-flex text-fuchsia-400 text-[12.83px] font-bold font-['Campton']"
                      >
                        View more
                      </Button>
                    )}
                  </motion.div>
                </Tab>
                <Tab
                  key='notifications'
                  title={
                    notification?.length > 0 && (
                      <div>
                        Notifications
                        <Chip
                          size='sm'
                          className='text-black dark:text-white'
                          variant='light'
                        >
                          {notification?.length}
                        </Chip>
                      </div>
                    )
                  }
                >
                  <motion.div
                    initial={{ x: 100 }}
                    animate={{ x: 0 }}
                    className='flex flex-col gap-2'
                    transition={{
                      rotate: { duration: 2 },
                      scale: { duration: 0.4 },
                    }}
                  >
                    <NotificationCard />

                    {notification?.length > 8 && (
                      <Button
                        variant='light'
                        className="text-center  bg-none mx-auto px-2 py-3 justify-center items-center gap-1 inline-flex text-fuchsia-400 text-[12.83px] font-bold font-['Campton']"
                      >
                        View more
                      </Button>
                    )}
                  </motion.div>
                </Tab>
                <Tab
                  key='messages'
                  title={
                    notification?.length > 0 && (
                      <div>
                        Messages
                        <Chip
                          size='sm'
                          className='text-black dark:text-white'
                          variant='light'
                        >
                          {messages?.length}
                        </Chip>
                      </div>
                    )
                  }
                >
                  <motion.div
                    initial={{ x: 100 }}
                    animate={{ x: 0 }}
                    className='flex flex-col gap-2'
                    transition={{
                      rotate: { duration: 2 },
                      scale: { duration: 0.4 },
                    }}
                  >
                    <MessageCard />
                    {messages?.length > 8 && (
                      <Button
                        variant='light'
                        className="text-center  bg-none mx-auto px-2 py-3 justify-center items-center gap-1 inline-flex text-fuchsia-400 text-[12.83px] font-bold font-['Campton']"
                      >
                        View more
                      </Button>
                    )}
                  </motion.div>
                </Tab>
              </Tabs>
            </div>
          </AnimatePresence>
        </div>
      </div>
    </>
  )
}
