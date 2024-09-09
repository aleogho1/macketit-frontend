/* eslint-disable no-irregular-whitespace */

import { useNavigate } from 'react-router-dom'
import frameImageLight from '../../../../assets/engageIcon237873.svg'
import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Tab, Tabs, useDisclosure } from '@nextui-org/react'
import PostAdvertTasksCard from '../../PostAdvertTasksCard'
import IgGeneratedTask from '../IgGeneratedTask'
import ConfirmTaskModal from '../ConfirmTaskModal'
import { usePerformTask } from '../../../../api/earnApi'
import { useDarkMode } from 'usehooks-ts'
import frameImageDark from '../../../../assets/FrameHeaderDark.svg'

export default function GenerateShareEngageTask() {
  const [selected, setSelected] = useState()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { data: fetchTask } = usePerformTask(selected)
  const { isDarkMode } = useDarkMode()
  const frameImage = isDarkMode ? frameImageDark : frameImageLight

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
                  <g clipPath='url(#clip0_5698_32993)'>
                    <path
                      d='M23.5 0.589844C10.5214 0.589844 0 11.1114 0 24.0898C0 37.0692 10.5216 47.5898 23.5 47.5898C36.4795 47.5898 47 37.0692 47 24.0898C47 11.1123 36.4795 0.591129 23.4996 0.591129L23.5 0.589844ZM34.2768 34.4838C33.8558 35.1741 32.9521 35.393 32.2618 34.9692C26.7443 31.599 19.7986 30.8356 11.6185 32.7046C11.2398 32.7908 10.8422 32.7231 10.5134 32.5163C10.1845 32.3094 9.95126 31.9805 9.86486 31.6018C9.82181 31.4143 9.81616 31.2201 9.84824 31.0304C9.88033 30.8407 9.94951 30.6592 10.0518 30.4963C10.1542 30.3334 10.2876 30.1923 10.4445 30.081C10.6015 29.9698 10.7788 29.8905 10.9664 29.8479C19.9185 27.8027 27.5969 28.6832 33.7913 32.4689C34.4817 32.8926 34.7005 33.7935 34.2768 34.4838ZM37.1531 28.085C36.6225 28.947 35.4945 29.2193 34.6331 28.6889C28.3164 24.8062 18.6875 23.6817 11.2161 25.9496C10.2471 26.2423 9.22375 25.6963 8.92963 24.7289C8.63772 23.7599 9.18409 22.7384 10.1514 22.4439C18.6858 19.8542 29.2957 21.1087 36.5498 25.5663C37.4113 26.0969 37.6835 27.2247 37.1531 28.085ZM37.4001 21.4219C29.8261 16.9231 17.3301 16.5093 10.0989 18.7043C8.93771 19.0564 7.70965 18.4008 7.35789 17.2396C7.00594 16.0778 7.66082 14.8507 8.82296 14.4976C17.1238 11.9776 30.9234 12.4647 39.6432 17.6413C40.6901 18.2611 41.0323 19.6102 40.4121 20.6532C39.7949 21.6978 38.4421 22.042 37.4012 21.4219H37.4001Z'
                      fill='#1ED760'
                    />
                  </g>
                  <defs>
                    <clipPath id='clip0_5698_32993'>
                      <rect
                        width='47'
                        height='47'
                        fill='white'
                        transform='translate(0 0.589844)'
                      />
                    </clipPath>
                  </defs>
                </svg>
              </div>
              <div className='justify-center items-start gap-2 inline-flex'>
                <div className='max-w-[484px] flex-col justify-start items-center gap-3 inline-flex'>
                  <div className="text-white dark:text-black text-sm font-medium font-['Manrope']">
                    Post adverts on Sportyfy
                  </div>
                  <div className="self-stretch dark:text-black text-center text-white text-xs font-normal font-['Manrope']">
                    Like and Follow Sportyfy Pages for Businesses and
                    Organizations and earn
                    <br />
                    ₦10 per Like/Follow. The more pages you like, the more you
                    earn.
                  </div>
                  <div className='p-1 dark:bg-[#3793FF21] bg-white rounded justify-start items-start gap-3 inline-flex'>
                    <div className="text-center text-blue-600 text-[12.83px] font-normal font-['Manrope']">
                      0 Task available
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* <div className='self-stretch p-6 dark:bg-black bg-zinc-400 bg-opacity-30 justify-start items-start gap-[29px] inline-flex'>
              <div className='grow shrink basis-0 flex-col justify-start items-start gap-2.5 inline-flex'>
                <div className="text-center dark:text-white text-stone-900 text-base font-bold font-['Manrope']">
                  Link your Sportyfy Account
                </div>
                <div className="self-stretch dark:text-gray-400 text-stone-900 text-xs font-normal font-['Manrope']">
                  You need to link your  Sportyfy  Account to Trendit before you
                  can start earning with your  Sportyfy  Account. Click the
                  button below to link your  Sportyfy  account now.
                </div>
                <div className='p-2 dark:bg-stone-900 bg-white border border-violet-500 border-opacity-25 justify-center items-center gap-1 inline-flex'>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    width='20'
                    height='20'
                    viewBox='0 0 47 48'
                    fill='none'
                  >
                    <g clipPath='url(#clip0_5698_32993)'>
                      <path
                        d='M23.5 0.589844C10.5214 0.589844 0 11.1114 0 24.0898C0 37.0692 10.5216 47.5898 23.5 47.5898C36.4795 47.5898 47 37.0692 47 24.0898C47 11.1123 36.4795 0.591129 23.4996 0.591129L23.5 0.589844ZM34.2768 34.4838C33.8558 35.1741 32.9521 35.393 32.2618 34.9692C26.7443 31.599 19.7986 30.8356 11.6185 32.7046C11.2398 32.7908 10.8422 32.7231 10.5134 32.5163C10.1845 32.3094 9.95126 31.9805 9.86486 31.6018C9.82181 31.4143 9.81616 31.2201 9.84824 31.0304C9.88033 30.8407 9.94951 30.6592 10.0518 30.4963C10.1542 30.3334 10.2876 30.1923 10.4445 30.081C10.6015 29.9698 10.7788 29.8905 10.9664 29.8479C19.9185 27.8027 27.5969 28.6832 33.7913 32.4689C34.4817 32.8926 34.7005 33.7935 34.2768 34.4838ZM37.1531 28.085C36.6225 28.947 35.4945 29.2193 34.6331 28.6889C28.3164 24.8062 18.6875 23.6817 11.2161 25.9496C10.2471 26.2423 9.22375 25.6963 8.92963 24.7289C8.63772 23.7599 9.18409 22.7384 10.1514 22.4439C18.6858 19.8542 29.2957 21.1087 36.5498 25.5663C37.4113 26.0969 37.6835 27.2247 37.1531 28.085ZM37.4001 21.4219C29.8261 16.9231 17.3301 16.5093 10.0989 18.7043C8.93771 19.0564 7.70965 18.4008 7.35789 17.2396C7.00594 16.0778 7.66082 14.8507 8.82296 14.4976C17.1238 11.9776 30.9234 12.4647 39.6432 17.6413C40.6901 18.2611 41.0323 19.6102 40.4121 20.6532C39.7949 21.6978 38.4421 22.042 37.4012 21.4219H37.4001Z'
                        fill='#1ED760'
                      />
                    </g>
                    <defs>
                      <clipPath id='clip0_5698_32993'>
                        <rect
                          width='47'
                          height='47'
                          fill='white'
                          transform='translate(0 0.589844)'
                        />
                      </clipPath>
                    </defs>
                  </svg>
                  <div className="text-center dark:text-white text-stone-900 text-[12.83px] font-bold font-['Manrope']">
                    Link Sportyfy account
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
              <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-4'>
                {fetchTask?.map((task, index) => (
                  <div key={index} className=''>
                    <IgGeneratedTask
                      status={task?.status}
                      caption={task?.task?.caption}
                      price={task?.reward_money}
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
              <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-4'>
                {fetchTask?.map((task, index) => (
                  <div key={index} className=''>
                    <IgGeneratedTask
                      status={task?.status}
                      caption={task?.task?.caption}
                      price={task?.reward_money}
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
              <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-4'>
                {fetchTask?.map((task, index) => (
                  <div key={index} className=''>
                    <IgGeneratedTask
                      status={task?.status}
                      caption={task?.task?.caption}
                      price={task?.reward_money}
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
              <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-4'>
                {fetchTask?.map((task, index) => (
                  <div key={index} className=''>
                    <IgGeneratedTask
                      status={task?.status}
                      caption={task?.task?.caption}
                      price={task?.reward_money}
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
              <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-4'>
                {fetchTask?.map((task, index) => (
                  <div key={index} className=''>
                    <IgGeneratedTask
                      status={task?.status}
                      caption={task?.task?.caption}
                      price={task?.reward_money}
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
                <div className="self-stretch dark:text-[#B1B1B1] w-[30rem] text-center text-black text-xs font-normal font-['Manrope']">
                  Earn steady income by posting adverts of businesses and top
                  brands on your social media page. To post adverts on Facebook,
                  Instagram, Twitter or Tiktok, you MUST have atleast 1,000
                  Followers on your social media account.
                </div>
              </div>
              <div
                onClick={onOpen}
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
            </div>
          )}
        </div>
      </div>

      <ConfirmTaskModal
        isOpen={isOpen}
        onClose={onClose}
        task_type='engagement'
        goal='share'
        title='Generate Share and Repost Task?'
      />
    </>
  )
}
