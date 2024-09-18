/* eslint-disable no-irregular-whitespace */

import { useNavigate } from 'react-router-dom'
import frameImageLight from '../../../../assets/engageIcon237873.svg'
import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Tab, Tabs, useDisclosure } from '@nextui-org/react'
import PostAdvertTasksCard from '../../PostAdvertTasksCard'
import IgGeneratedTask from '.././IgGeneratedTask'
import ConfirmTaskModal from '.././ConfirmTaskModal'
import { usePerformTask, useGetAdvertTask } from '../../../../api/earnApi'
import { useDarkMode } from 'usehooks-ts'
import frameImageDark from '../../../../assets/FrameHeaderDark.svg'
import Icons from '../../../../components/Icon'
import toast from 'react-hot-toast'
// import { useGetProfile } from '../../../../api/profileApis'

export default function GenerateWapTask() {
  const [selected, setSelected] = useState()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { data: fetchTask } = usePerformTask(selected, 'Whatsapp')
  const { isDarkMode } = useDarkMode()
  const frameImage = isDarkMode ? frameImageDark : frameImageLight
  const navigate = useNavigate()
  // const { data: profileDeatils } = useGetProfile()
  const { data: advertTask } = useGetAdvertTask('Whatsapp')

  return (
    <>
      <div>
        <div className='w-full min-h-screen p-3 flex-col justify-start items-start gap-3 flex'>
          <div
            onClick={() => navigate(-1)}
            className='justify-start cursor-pointer items-center gap-[7px] inline-flex'
          >
            <div className='cursor-pointer'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                width='24'
                height='24'
                viewBox='0 0 24 24'
                fill='none'
              >
                <path
                  d='M18.9998 12H5.99985M10.9998 6L5.70696 11.2929C5.31643 11.6834 5.31643 12.3166 5.70696 12.7071L10.9998 18'
                  strokeWidth='2'
                  strokeLinecap='round'
                  className='dark:stroke-white stroke-black'
                />
              </svg>
            </div>
            <div className="text-center text-primaryText text-sm font-medium font-['Manrope']">
              Go back
            </div>
          </div>
          <div className='self-stretch flex-col justify-start items-start flex'>
            <div className='self-stretch h-[347px] pb-6 dark:bg-white bg-stone-900 border border-stone-900 flex-col justify-center items-center gap-6 flex'>
              <div
                style={{
                  backgroundImage: `url(${frameImage})`,
                  backgroundRepeat: 'no-repeat',
                  backgroundSize: 'cover',
                }}
                className=' w-full  h-[120px]'
              ></div>
              <div className='w-[47px] h-[47px] relative'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  width='47'
                  height='47'
                  viewBox='0 0 47 47'
                  fill='none'
                >
                  <path
                    d='M1.00869 23.2187C1.00759 27.1677 2.0472 31.0235 4.02401 34.422L0.819641 46.034L12.7928 42.9181C16.1044 44.7074 19.8148 45.645 23.5854 45.6452H23.5953C36.0425 45.6452 46.1749 35.5925 46.1802 23.2364C46.1826 17.249 43.8354 11.6188 39.5709 7.38302C35.3071 3.14755 29.6364 0.813768 23.5944 0.811035C11.1456 0.811035 1.01402 10.8632 1.00888 23.2187'
                    fill='url(#paint0_linear_4836_69560)'
                  />
                  <path
                    d='M0.202377 23.2114C0.201092 27.3024 1.27796 31.2962 3.32525 34.8164L0.00598145 46.8446L12.4084 43.6171C15.8257 45.4663 19.6732 46.4413 23.5883 46.4427H23.5984C36.4922 46.4427 46.9885 36.0284 46.994 23.23C46.9963 17.0275 44.5646 11.1949 40.1477 6.80735C35.7303 2.42032 29.8568 0.00255039 23.5984 0C10.7024 0 0.207516 10.4129 0.202377 23.2114ZM7.5885 34.2102L7.12541 33.4806C5.17871 30.4085 4.15121 26.8583 4.15268 23.2129C4.15672 12.5751 12.8796 3.92031 23.6057 3.92031C28.8001 3.9225 33.6817 5.9322 37.3534 9.57853C41.0249 13.2252 43.0452 18.0728 43.0439 23.2286C43.0392 33.8664 34.3161 42.5222 23.5984 42.5222H23.5907C20.1009 42.5204 16.6783 41.5903 13.6935 39.8325L12.9831 39.4144L5.62326 41.3296L7.5885 34.2102Z'
                    fill='url(#paint1_linear_4836_69560)'
                  />
                  <path
                    d='M17.7509 13.5077C17.313 12.5416 16.8521 12.5221 16.4356 12.5052C16.0946 12.4906 15.7047 12.4917 15.3153 12.4917C14.9254 12.4917 14.292 12.6373 13.7566 13.2175C13.2206 13.7982 11.7104 15.2017 11.7104 18.0561C11.7104 20.9107 13.8052 23.6693 14.0972 24.0568C14.3896 24.4436 18.1413 30.4887 24.0831 32.8143C29.0213 34.7469 30.0262 34.3626 31.0979 34.2656C32.1698 34.1691 34.5567 32.8626 35.0436 31.5078C35.531 30.1532 35.531 28.992 35.3849 28.7493C35.2387 28.5076 34.8489 28.3624 34.2643 28.0724C33.6795 27.7822 30.8055 26.3786 30.2698 26.1849C29.7338 25.9915 29.3441 25.8949 28.9543 26.4759C28.5644 27.0559 27.445 28.3624 27.1038 28.7493C26.7629 29.1372 26.4217 29.1855 25.8373 28.8953C25.2523 28.6042 23.3697 27.9922 21.1361 26.0159C19.3983 24.478 18.225 22.5789 17.884 21.9979C17.543 21.4179 17.8475 21.1035 18.1406 20.8144C18.4033 20.5544 18.7254 20.1369 19.018 19.7982C19.3094 19.4594 19.4067 19.2176 19.6016 18.8307C19.7967 18.4434 19.6991 18.1046 19.5532 17.8144C19.4067 17.5242 18.2707 14.6548 17.7509 13.5077Z'
                    fill='white'
                  />
                  <defs>
                    <linearGradient
                      id='paint0_linear_4836_69560'
                      x1='2268.85'
                      y1='4523.1'
                      x2='2268.85'
                      y2='0.811035'
                      gradientUnits='userSpaceOnUse'
                    >
                      <stop stopColor='#1FAF38' />
                      <stop offset='1' stopColor='#60D669' />
                    </linearGradient>
                    <linearGradient
                      id='paint1_linear_4836_69560'
                      x1='2349.41'
                      y1='4684.46'
                      x2='2349.41'
                      y2='0'
                      gradientUnits='userSpaceOnUse'
                    >
                      <stop stopColor='#F9F9F9' />
                      <stop offset='1' stopColor='white' />
                    </linearGradient>
                  </defs>
                </svg>
              </div>
              <div className='justify-center items-start gap-2 inline-flex'>
                <div className='max-w-[484px] flex-col justify-start items-center gap-3 inline-flex'>
                  <div className="text-white dark:text-black text-sm font-medium font-['Manrope']">
                    Post adverts on Whatsapp
                  </div>
                  <div className="self-stretch dark:text-black text-center text-white text-xs font-normal font-['Manrope']">
                    Promote advertisements for different businesses and top
                    brands on your Whatsapp status and earn ₦110 for each post.
                    The more you share, the more you earn.
                  </div>
                  <div className='p-1 dark:bg-[#3793FF21] bg-white rounded justify-start items-start gap-3 inline-flex'>
                    <div className="text-center text-blue-600 text-[12.83px] font-normal font-['Manrope']">
                      {advertTask?.length
                        ? `${advertTask?.length} Task available`
                        : 'No task available'}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className='self-stretch flex-col justify-start items-start gap-3 flex '>
            <div className=' justify-between w-full borderb borderstone-500 items-center flex'>
              <div className='justify-start overflow-x-clip items-center gap-[11px] flex'>
                <AnimatePresence mode='wait'>
                  <div className='flex flex-col  w-full'>
                    <Tabs
                      fullWidth
                      size='md'
                      aria-label='Tabs form'
                      selectedKey={selected}
                      onSelectionChange={setSelected}
                      variant='underlined'
                      classNames={{
                        tab: '!px0 mr2',
                        tabList: '!p0 bordered  py-2',
                        cursor: ' primaryBg',
                        selectedKey: 'text-green-400',
                        tabContent:
                          'group-data-[selected=true]:text-primaryText ',
                      }}
                      className="text-center  text-primaryText text-[12.83px] font-bold font-['Manrope']"
                      color='secondary'
                    >
                      <Tab
                        key='pending'
                        className=" text-zinc-400 text-[12.83px] font-bold font-['Manrope']"
                        title='Pending'
                      ></Tab>
                      <Tab
                        key='in_review'
                        title={
                          <div>
                            In Review
                            {/* <Chip
                              size='sm'
                              className='text-black dark:text-white'
                              variant='light'
                            >
                              23+
                            </Chip> */}
                          </div>
                        }
                        className=" text-zinc-400 text-[12.83px] font-bold font-['Manrope']"
                      ></Tab>
                      <Tab
                        key='failed'
                        className=" text-zinc-400 text-[12.83px] font-bold font-['Manrope']"
                        title='Failed'
                      ></Tab>
                      <Tab
                        key='completed'
                        title={'Completed'}
                        className=" text-zinc-400 text-[12.83px] font-bold font-['Manrope']"
                      ></Tab>
                      <Tab
                        key='cancelled'
                        title={'Cancelled'}
                        className=" text-zinc-400 text-[12.83px] font-bold font-['Manrope']"
                      ></Tab>
                    </Tabs>
                  </div>
                </AnimatePresence>
              </div>
              {fetchTask?.length >= 5 && (
                <div className='px-3 justify-start items-center gap-[11px] flex'>
                  <div className='justify-start items-center gap-[7px] flex'>
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      width='24'
                      height='25'
                      viewBox='0 0 24 25'
                      fill='none'
                    >
                      <path
                        d='M19.5858 3.5H4.41421C3.63316 3.5 3 4.13317 3 4.91421C3 5.28929 3.149 5.649 3.41421 5.91421L8.41421 10.9142C8.78929 11.2893 9 11.798 9 12.3284V17.2639C9 18.0215 9.428 18.714 10.1056 19.0528L14.2764 21.1382C14.6088 21.3044 15 21.0627 15 20.691V12.3284C15 11.798 15.2107 11.2893 15.5858 10.9142L20.5858 5.91421C20.851 5.649 21 5.28929 21 4.91421C21 4.13317 20.3668 3.5 19.5858 3.5Z'
                        strokeWidth='2'
                        strokeLinecap='round'
                        className='dark:stroke-[#B1B1B1] stroke-[#1E1E1E] '
                      />
                    </svg>
                    <div className="text-center dark:text-[#B1B1B1] text-primaryText text-sm font-medium font-['Manrope']">
                      Filter
                    </div>
                  </div>
                  <div className='justify-start items-center gap-[7px] flex'>
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      width='24'
                      height='25'
                      viewBox='0 0 24 25'
                      fill='none'
                    >
                      <path
                        d='M5 17.5L5 7.5M7 16.5L5.35355 18.1464C5.15829 18.3417 4.84171 18.3417 4.64645 18.1464L3 16.5M12 4.5H21M12 12.5H18M12 20.5H14M12 8.5H20M12 16.5H16'
                        strokeWidth='2'
                        strokeLinecap='round'
                        className='dark:stroke-[#B1B1B1] stroke-[#1E1E1E] '
                      />
                    </svg>
                    <div className="text-center dark:text-[#B1B1B1] text-primaryText text-sm font-medium font-['Manrope']">
                      Sort
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
          {selected === 'post advert' && (
            <motion.div
              initial={{ x: 100 }}
              animate={{ x: 0 }}
              className='flex flex-col gap-2 w-full'
              transition={{
                rotate: { duration: 2 },
                scale: { duration: 0.4 },
              }}
            >
              <PostAdvertTasksCard />
            </motion.div>
          )}
          {selected === 'cancelled' && (
            <motion.div
              initial={{ x: 100 }}
              animate={{ x: 0 }}
              className='flex flex-col gap-2 w-full'
              transition={{
                rotate: { duration: 2 },
                scale: { duration: 0.4 },
              }}
            >
              <div className='grid md:grid-cols-2 lg:grid-cols-3 justify-items-center gap-4'>
                {fetchTask?.map((task, index) => (
                  <div key={index} className='w-full'>
                    <IgGeneratedTask
                      status={task?.status}
                      caption={task?.task?.caption}
                      price={task?.reward_money}
                      platform={task?.task?.platform}
                      task_id={task?.key}
                      task_type={task?.task?.task_type}
                      goal={task?.task?.goal}
                      when={format(
                        new Date(task?.task?.date_created),
                        'yyyy-MM-dd HH:mm:ss'
                      )}
                    />
                  </div>
                ))}
              </div>
            </motion.div>
          )}
          {selected === 'completed' && (
            <motion.div
              initial={{ x: 100 }}
              animate={{ x: 0 }}
              className='flex flex-col gap-2 w-full'
              transition={{
                rotate: { duration: 2 },
                scale: { duration: 0.4 },
              }}
            >
              <div className='grid md:grid-cols-2 lg:grid-cols-3 justify-items-center gap-4'>
                {fetchTask?.map((task, index) => (
                  <div key={index} className='w-full'>
                    <IgGeneratedTask
                      status={task?.status}
                      caption={task?.task?.caption}
                      price={task?.reward_money}
                      platform={task?.task?.platform}
                      task_id={task?.key}
                      task_type={task?.task?.task_type}
                      goal={task?.task?.goal}
                      when={format(
                        new Date(task?.task?.date_created),
                        'yyyy-MM-dd HH:mm:ss'
                      )}
                    />
                  </div>
                ))}
              </div>
            </motion.div>
          )}
          {selected === 'failed' && (
            <motion.div
              initial={{ x: 100 }}
              animate={{ x: 0 }}
              className='flex flex-col gap-2 w-full'
              transition={{
                rotate: { duration: 2 },
                scale: { duration: 0.4 },
              }}
            >
              <div className='grid md:grid-cols-2 lg:grid-cols-3 justify-items-center gap-4'>
                {fetchTask?.map((task, index) => (
                  <div key={index} className='w-full'>
                    <IgGeneratedTask
                      status={task?.status}
                      caption={task?.task?.caption}
                      price={task?.reward_money}
                      platform={task?.task?.platform}
                      task_id={task?.key}
                      task_type={task?.task?.task_type}
                      goal={task?.task?.goal}
                      when={format(
                        new Date(task?.task?.date_created),
                        'yyyy-MM-dd HH:mm:ss'
                      )}
                    />
                  </div>
                ))}
              </div>
            </motion.div>
          )}
          {selected === 'pending' && (
            <motion.div
              initial={{ x: 100 }}
              animate={{ x: 0 }}
              className='flex flex-col gap-2 w-full'
              transition={{
                rotate: { duration: 2 },
                scale: { duration: 0.4 },
              }}
            >
              <div className='grid md:grid-cols-2 lg:grid-cols-3 justify-items-center gap-4'>
                {fetchTask?.map((task, index) => (
                  <div key={index} className='w-full'>
                    <IgGeneratedTask
                      status={task?.status}
                      caption={task?.task?.caption}
                      price={task?.reward_money}
                      platform={task?.task?.platform}
                      task_id={task?.key}
                      task_type={task?.task?.task_type}
                      goal={task?.task?.goal}
                      when={format(
                        new Date(task?.task?.date_created),
                        'yyyy-MM-dd HH:mm:ss'
                      )}
                    />
                  </div>
                ))}
              </div>
            </motion.div>
          )}
          {selected === 'in_review' && (
            <motion.div
              initial={{ x: 100 }}
              animate={{ x: 0 }}
              className='flex flex-col gap-2 w-full'
              transition={{
                rotate: { duration: 2 },
                scale: { duration: 0.4 },
              }}
            >
              <div className='grid md:grid-cols-2 lg:grid-cols-3 justify-items-center gap-4'>
                {fetchTask?.map((task, index) => (
                  <div key={index} className='w-full'>
                    <IgGeneratedTask
                      status={task?.status}
                      caption={task?.task?.caption}
                      price={task?.reward_money}
                      platform={task?.task?.platform}
                      task_id={task?.key}
                      task_type={task?.task?.task_type}
                      goal={task?.task?.goal}
                      when={format(
                        new Date(task?.task?.date_created),
                        'yyyy-MM-dd HH:mm:ss'
                      )}
                    />
                  </div>
                ))}
              </div>
            </motion.div>
          )}
          {selected === 'pending' && fetchTask?.length === 0 && (
            <div className='self-stretch h[390px] flex-col justify-center items-center gap-6 flex'>
              <div className='p-2 bg-zinc-400 bg-opacity-20 rounded-[9px] justify-center items-center gap-2 inline-flex'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  width='25'
                  height='24'
                  viewBox='0 0 25 24'
                  fill='none'
                >
                  <path
                    d='M18 14V17.5M18 17.5V21M18 17.5H21.5M18 17.5H14.5M5.5 10H8.5C9.60457 10 10.5 9.10457 10.5 8V5C10.5 3.89543 9.60457 3 8.5 3H5.5C4.39543 3 3.5 3.89543 3.5 5V8C3.5 9.10457 4.39543 10 5.5 10ZM5.5 21H8.5C9.60457 21 10.5 20.1046 10.5 19V16C10.5 14.8954 9.60457 14 8.5 14H5.5C4.39543 14 3.5 14.8954 3.5 16V19C3.5 20.1046 4.39543 21 5.5 21ZM16.5 10H19.5C20.6046 10 21.5 9.10457 21.5 8V5C21.5 3.89543 20.6046 3 19.5 3H16.5C15.3954 3 14.5 3.89543 14.5 5V8C14.5 9.10457 15.3954 10 16.5 10Z'
                    stroke='#FFD0FE'
                    strokeWidth='2'
                    strokeLinecap='round'
                  />
                </svg>
              </div>
              <div className='h[58px]  flex-col justify-start items-center gap-3 flex'>
                <div className="text-black dark:text-white text-sm font-bold font-['Manrope']">
                  Need quick cash to earn?
                </div>
                <div className="self-stretch dark:text-[#B1B1B1] w-[320px] md:w-[30rem] text-center text-black text-xs font-normal font-['Manrope']">
                  Earn steady income by posting adverts of businesses and top
                  brands on your Whatsapp status.
                </div>
              </div>
              <div
                onClick={() =>
                  advertTask?.length !== 0
                    ? onOpen()
                    : toast.error('No task is available')
                }
                className='w-[290px] px-6 dark:bg-white cursor-pointer py-3.5 primaryBg rounded-[100px] justify-center items-center gap-2 inline-flex'
              >
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  width='17'
                  height='16'
                  viewBox='0 0 17 16'
                  fill='none'
                >
                  <path
                    d='M9.83398 6.66659L3.83398 12.6666M11.834 4.66659L13.1673 3.33325M7.83398 4.66659L6.50065 3.33325M13.1673 9.99992L11.834 8.66659M9.83398 3.99992V3.33325M9.83398 10.6666V9.99992M12.5007 6.66659H13.1673M5.83398 6.66659H6.50065'
                    stroke='#1877F2'
                    strokeLinecap='round'
                  />
                </svg>
                <div className="text-center  dark:text-black text-white text-[12.83px] font-medium font-['Manrope']">
                  Generate task
                </div>
              </div>
              <div className="dark:text-[#B1B1B1] text-center w-8/12 self-center text-center text-black text-xs font-normal font-['Manrope']">
                To receive your next Whatsapp advert task, click the Above.
                You'll get one task at a time, and you must complete the current
                task before a new one is generated.
              </div>
            </div>
          )}
        </div>
      </div>

      <ConfirmTaskModal
        isOpen={isOpen}
        onClose={onClose}
        task_type='advert'
        platform='whatsapp'
      />
    </>
  )
}
