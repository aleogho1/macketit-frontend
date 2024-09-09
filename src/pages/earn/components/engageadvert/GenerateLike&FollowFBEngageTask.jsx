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

export default function GenerateLikeFollowFBEngageTask() {
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
            <div className="text-center text-fuchsia-400 text-sm font-medium font-['Manrope']">
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
                  height='48'
                  viewBox='0 0 47 48'
                  fill='none'
                >
                  <path
                    d='M47 24.0898C47 11.1112 36.4786 0.589844 23.5 0.589844C10.5214 0.589844 0 11.1112 0 24.0898C0 35.8193 8.59366 45.5415 19.8281 47.3044V30.8828H13.8613V24.0898H19.8281V18.9125C19.8281 13.0228 23.3366 9.76953 28.7045 9.76953C31.2756 9.76953 33.9648 10.2285 33.9648 10.2285V16.0117H31.0016C28.0823 16.0117 27.1719 17.8232 27.1719 19.6818V24.0898H33.6895L32.6476 30.8828H27.1719V47.3044C38.4063 45.5415 47 35.8195 47 24.0898Z'
                    fill='#1877F2'
                  />
                  <path
                    d='M32.6476 30.8828L33.6895 24.0898H27.1719V19.6818C27.1719 17.8231 28.0823 16.0117 31.0016 16.0117H33.9648V10.2285C33.9648 10.2285 31.2756 9.76953 28.7043 9.76953C23.3366 9.76953 19.8281 13.0228 19.8281 18.9125V24.0898H13.8613V30.8828H19.8281V47.3044C21.0428 47.4947 22.2705 47.5902 23.5 47.5898C24.7295 47.5902 25.9572 47.4948 27.1719 47.3044V30.8828H32.6476Z'
                    fill='white'
                  />
                </svg>
              </div>
              <div className='justify-center items-start gap-2 inline-flex'>
                <div className='max-w-[484px] flex-col justify-start items-center gap-3 inline-flex'>
                  <div className="text-white dark:text-black text-sm text-center font-medium font-['Manrope']">
                    Post adverts on Facebook
                  </div>
                  <div className="self-stretch dark:text-black text-center text-white  w-11/12 m-auto text-xs font-normal font-['Manrope']">
                    Like and follow Facebook pages for individuals, buisnesses, and organizations, and earn #3.5 per 
                    like or follow. The more pages you like and follow, the more you earn.
                  </div>
                  <div className='p-1 dark:bg-[#3793FF21] bg-white rounded justify-start items-start gap-3 inline-flex'>
                    <div className="text-center text-blue-600 text-[12.83px] font-normal font-['Manrope']">
                    {
                        EngageTask?.[`follow and like`] ?  `${EngageTask?.[`follow and like`]?.total} Task available` : 'No task available'
                      }
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* <div className='self-stretch p-6 dark:bg-black bg-zinc-400 bg-opacity-30 justify-start items-start gap-[29px] inline-flex'>
              <div className='grow shrink basis-0 flex-col justify-start items-start gap-2.5 inline-flex'>
                <div className="text-center dark:text-white text-stone-900 text-base font-bold font-['Manrope']">
                  Link your Youtube Account
                </div>
                <div className="self-stretch dark:text-gray-400 text-stone-900 text-xs font-normal font-['Manrope']">
                  You need to link your Youtube Account to Trendit before you
                  can start earning with your youtube Account. Click the button
                  below to link your Youtube account now.
                </div>
                <div className='p-2 dark:bg-stone-900 bg-white border border-violet-500 border-opacity-25 justify-center items-center gap-1 inline-flex'>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    width='20'
                    height='20'
                    viewBox='0 0 20 20'
                    fill='none'
                  >
                    <path
                      d='M19.5564 3.11944C19.4417 2.51651 19.218 1.96683 18.9075 1.52514C18.597 1.08346 18.2106 0.765179 17.7868 0.602C16.235 0 9.98986 0 9.98986 0C9.98986 0 3.74436 0.0182222 2.19263 0.620222C1.76877 0.783411 1.38236 1.10171 1.07187 1.54341C0.761386 1.98512 0.537662 2.53482 0.42298 3.13778C-0.0463818 7.05978 -0.228456 13.036 0.435868 16.8011C0.550562 17.4041 0.774291 17.9537 1.08478 18.3954C1.39526 18.8371 1.78167 19.1554 2.20552 19.3186C3.75725 19.9206 10.0026 19.9206 10.0026 19.9206C10.0026 19.9206 16.2479 19.9206 17.7995 19.3186C18.2234 19.1554 18.6098 18.8371 18.9203 18.3954C19.2308 17.9538 19.4545 17.4041 19.5692 16.8011C20.0643 12.8736 20.2168 6.901 19.5564 3.11944Z'
                      fill='#FF0000'
                    />
                    <path
                      d='M8.00195 14.229L13.1828 9.96032L8.00195 5.69165V14.229Z'
                      fill='white'
                    />
                  </svg>
                  <div className="text-center dark:text-white text-stone-900 text-[12.83px] font-bold font-['Manrope']">
                    Link Youtube account
                  </div>
                </div>
              </div>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                width='24'
                height='24'
                viewBox='0 0 24 24'
                fill='none'
              >
                <path
                  d='M18 6L6 18M18 18L6 6.00001'
                  strokeWidth='2'
                  strokeLinecap='round'
                  className='dark:stroke-white stroke-[#1E1E1E] '
                />
              </svg>
            </div> */}
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
                        cursor: ' bg-fuchsia-400',
                        selectedKey: 'text-green-400',
                        tabContent:
                          'group-data-[selected=true]:text-fuchsia-400 ',
                      }}
                      className="text-center  text-fuchsia-400 text-[12.83px] font-bold font-['Manrope']"
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
                  <div className="text-center dark:text-[#B1B1B1] text-stone-900 text-sm font-medium font-['Manrope']">
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
                  <div className="text-center dark:text-[#B1B1B1] text-stone-900 text-sm font-medium font-['Manrope']">
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
                <div className=" text-sm font-bold font-['Manrope']">
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
                onClick={() => EngageTask?.[`follow and like`] ? onOpen() : toast.error('No task is available')}
                className='w-[290px] px-6 dark:bg-white cursor-pointer py-3.5 bg-fuchsia-400 rounded-[100px] justify-center items-center gap-2 inline-flex'
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
                    To receive your next Facebook page like and follow task, Click Generate task.
                    You'll get one task at a time, and you must complete the current task before a new one is generated.
              </div>
            </div>
          )}
        </div>
      </div>

      <ConfirmTaskModal
        isOpen={isOpen}
        onClose={onClose}
        task_type='engagement'
        goal='follow and like'
        title='Generate Like Task?'
      />
    </>
  )
}
