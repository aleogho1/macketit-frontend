/* eslint-disable no-irregular-whitespace */

import { useNavigate } from 'react-router-dom'
import frameImageLight from '../../../../assets/engageIcon237873.svg'
import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Tab, Tabs, useDisclosure } from '@nextui-org/react'
import PostAdvertTasksCard from '../../PostAdvertTasksCard'
import IgGeneratedTask from '../IgGeneratedTask'
import ConfirmTaskModal from '../ConfirmTaskModal'
import { usePerformTask, useGetEngageTask } from '../../../../api/earnApi'
import { useDarkMode } from 'usehooks-ts'
import frameImageDark from '../../../../assets/FrameHeaderDark.svg'
import toast from 'react-hot-toast'

export default function GenerateFollowEngageTask() {
  const [selected, setSelected] = useState()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { data: fetchTask } = usePerformTask(selected)
  const { isDarkMode } = useDarkMode()
  const frameImage = isDarkMode ? frameImageDark : frameImageLight
  const { data: EngageTask } = useGetEngageTask()

  const navigate = useNavigate()
  return (
    <>
      <div>
        <div className='w-full min-h-screen p-3 flex-col justify-start items-start gap-3 flex'>
          <div
            onClick={() => navigate('/dashboard/earn/?tab=engagement-tasks')}
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
                  width='44'
                  height='45'
                  viewBox='0 0 44 45'
                  fill='none'
                >
                  <path
                    d='M28.4231 26.9898C31.3225 26.9898 34.1031 28.1488 36.1532 30.2117C38.2033 32.2746 39.3551 35.0725 39.3551 37.9898V40.1898C39.3551 41.3568 38.8944 42.476 38.0743 43.3011C37.2543 44.1263 36.142 44.5898 34.9823 44.5898H4.37279C3.21305 44.5898 2.10082 44.1263 1.28076 43.3011C0.460703 42.476 0 41.3568 0 40.1898V37.9898C0 35.0725 1.15176 32.2746 3.2019 30.2117C5.25204 28.1488 8.03263 26.9898 10.932 26.9898H28.4231ZM40.2603 16.168C40.6528 15.7693 41.182 15.5366 41.7395 15.5175C42.2969 15.4985 42.8406 15.6946 43.2591 16.0657C43.6776 16.4367 43.9393 16.9547 43.9907 17.5136C44.0421 18.0725 43.8792 18.63 43.5355 19.072L43.3518 19.281L37.1687 25.5026C36.7922 25.8814 36.2913 26.109 35.76 26.1426C35.2286 26.1762 34.7033 26.0136 34.2827 25.6852L34.0771 25.5026L30.9856 22.3918C30.5893 21.9969 30.358 21.4644 30.3391 20.9034C30.3202 20.3425 30.5151 19.7955 30.8838 19.3744C31.2526 18.9533 31.7674 18.6899 32.3228 18.6382C32.8783 18.5865 33.4323 18.7504 33.8716 19.0962L34.0771 19.281L35.6229 20.8364L40.2603 16.168ZM19.6775 0.589844C22.5769 0.589844 25.3575 1.74877 27.4076 3.81167C29.4578 5.87457 30.6095 8.67246 30.6095 11.5898C30.6095 14.5072 29.4578 17.3051 27.4076 19.368C25.3575 21.4309 22.5769 22.5898 19.6775 22.5898C16.7782 22.5898 13.9976 21.4309 11.9475 19.368C9.89734 17.3051 8.74558 14.5072 8.74558 11.5898C8.74558 8.67246 9.89734 5.87457 11.9475 3.81167C13.9976 1.74877 16.7782 0.589844 19.6775 0.589844Z'
                    fill='#FC11F5'
                  />
                </svg>
              </div>
              <div className='justify-center items-start gap-2 inline-flex'>
                <div className='max-w-[484px] flex-col justify-start items-center gap-3 inline-flex'>
                  <div className="text-white dark:text-black text-sm text-center font-medium font-['Manrope']">
                    Follow peoples and Business pages on Several Social Media
                    Platforms
                  </div>
                  <div className="self-stretch dark:text-black text-center text-white text-xs w-11/12 m-auto font-normal font-['Manrope']">
                    Follow people and pages on selected social media patforms
                    such as Facebook, Instagram, TikTok, and others, and earn
                    #3.5 per follow. Unlock your earning potential by performing
                    one task at a time. The more pages you like, the more you
                    earn.
                  </div>
                  <div className='p-1 dark:bg-[#3793FF21] bg-white rounded justify-start items-start gap-3 inline-flex'>
                    <div className="text-center text-blue-600 text-[12.83px] font-normal font-['Manrope']">
                      {EngageTask?.follow
                        ? `${EngageTask?.follow?.total} Task available`
                        : 'No task available'}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className='self-stretch flex-col justify-start items-start gap-3 flex '>
            <div className=' justify-between w-full border-b border-stone-500 items-center flex'>
              <div className='justify-start  items-center gap-[11px] flex'>
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
                        tab: '!px-0 mr-2',
                        tabList: '!p-0',
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
                        title='Completed'
                        className=" text-zinc-400 text-[12.83px] font-bold font-['Manrope']"
                      ></Tab>
                      <Tab
                        key='cancelled'
                        title='Cancelled'
                        className=" text-zinc-400 text-[12.83px] font-bold font-['Manrope']"
                      ></Tab>
                    </Tabs>
                  </div>
                </AnimatePresence>
              </div>
              <div className='px-3 justify-start items-center gap-[11px] flx hidden'>
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
                      className='dark:stroke-[#B1B1B1] stroke-[#1E1E1E]'
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
                      className='dark:stroke-[#B1B1B1] stroke-[#1E1E1E]'
                    />
                  </svg>
                  <div className="text-center dark:text-[#B1B1B1] text-primaryText text-sm font-medium font-['Manrope']">
                    Sort
                  </div>
                </div>
              </div>
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
              <div className='flex-col justify-start items-center gap-3 flex'>
                <div className="text-sm font-bold font-['Manrope']">
                  Need quick cash to earn?
                </div>
                <div className="self-stretch dark:text-[#B1B1B1] w-[320px] md:w-[30rem] text-center text-black text-xs font-normal font-['Manrope']">
                  Earn steady income by posting adverts of businesses and top
                  brands on your social media page. To post adverts on Facebook,
                  Instagram, Twitter or Tiktok, you MUST have atleast 500
                  Followers on your social media account.
                </div>
              </div>
              <div
                onClick={() =>
                  EngageTask?.follow
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
                <div className="text-center dark:text-black text-white text-[12.83px] font-medium font-['Manrope']">
                  Generate task
                </div>
              </div>
              <div className="dark:text-[#B1B1B1] text-center w-8/12 self-center text-center text-black text-xs font-normal font-['Manrope']">
                To receive your next social media buisness page-follow task,
                Click Generate task. You'll get one task at a time, and you must
                complete the current task before a new one is generated.
              </div>
            </div>
          )}
        </div>
      </div>

      <ConfirmTaskModal
        isOpen={isOpen}
        onClose={onClose}
        task_type='engagement'
        goal='follow'
        title='Generate Follow Task?'
      />
    </>
  )
}
