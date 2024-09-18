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

export default function GenerateCommentEngageTask() {
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
                  width='47'
                  height='48'
                  viewBox='0 0 47 48'
                  fill='none'
                >
                  <path
                    fillRule='evenodd'
                    clipRule='evenodd'
                    d='M3.91701 24.0897C3.91701 13.2738 12.6845 4.50635 23.5003 4.50635C34.3162 4.50635 43.0837 13.2738 43.0837 24.0897C43.0837 34.9056 34.3162 43.673 23.5003 43.673C20.6147 43.6769 17.7642 43.0409 15.1539 41.8106L6.26897 43.6319C5.95173 43.6967 5.62337 43.6819 5.31327 43.5887C5.00317 43.4955 4.72101 43.3269 4.49205 43.098C4.26309 42.869 4.09448 42.5869 4.0013 42.2768C3.90812 41.9667 3.89329 41.6383 3.95814 41.3211L5.77939 32.4361C4.54914 29.8259 3.91308 26.9753 3.91701 24.0897ZM14.6878 21.1522C13.9088 21.1522 13.1616 21.4617 12.6107 22.0126C12.0598 22.5634 11.7503 23.3106 11.7503 24.0897V24.1093C11.7503 24.8883 12.0598 25.6355 12.6107 26.1864C13.1616 26.7373 13.9088 27.0468 14.6878 27.0468H14.7074C15.4865 27.0468 16.2337 26.7373 16.7846 26.1864C17.3354 25.6355 17.6449 24.8883 17.6449 24.1093V24.0897C17.6449 23.3106 17.3354 22.5634 16.7846 22.0126C16.2337 21.4617 15.4865 21.1522 14.7074 21.1522H14.6878ZM23.5003 21.1522C22.7213 21.1522 21.9741 21.4617 21.4232 22.0126C20.8723 22.5634 20.5628 23.3106 20.5628 24.0897V24.1093C20.5628 24.8883 20.8723 25.6355 21.4232 26.1864C21.9741 26.7373 22.7213 27.0468 23.5003 27.0468H23.5199C24.299 27.0468 25.0462 26.7373 25.5971 26.1864C26.1479 25.6355 26.4574 24.8883 26.4574 24.1093V24.0897C26.4574 23.3106 26.1479 22.5634 25.5971 22.0126C25.0462 21.4617 24.299 21.1522 23.5199 21.1522H23.5003ZM29.3753 24.0897C29.3753 23.3106 29.6848 22.5634 30.2357 22.0126C30.7866 21.4617 31.5338 21.1522 32.3128 21.1522H32.3324C33.1115 21.1522 33.8587 21.4617 34.4096 22.0126C34.9604 22.5634 35.2699 23.3106 35.2699 24.0897V24.1093C35.2699 24.8883 34.9604 25.6355 34.4096 26.1864C33.8587 26.7373 33.1115 27.0468 32.3324 27.0468H32.3128C31.5338 27.0468 30.7866 26.7373 30.2357 26.1864C29.6848 25.6355 29.3753 24.8883 29.3753 24.1093V24.0897Z'
                    fill='#36E232'
                  />
                </svg>
              </div>
              <div className='justify-center items-start gap-2 inline-flex'>
                <div className='max-w-[484px] flex-col justify-start items-center gap-3 inline-flex'>
                  <div className="text-white dark:text-black text-sm font-medium text-center font-['Manrope']">
                    Post comment on Several Social Media Pages
                  </div>
                  <div className="self-stretch dark:text-black text-center text-white w-11/12 m-auto text-xs font-normal font-['Manrope']">
                    Post comment on Several Social Media Pages for Individuals,
                    Businesses and Organizations and Earn ₦20 per comment. The
                    more pages you comment, the more you earn.
                  </div>
                  <div className='p-1 dark:bg-[#3793FF21] bg-white rounded justify-start items-start gap-3 inline-flex'>
                    <div className="text-center text-blue-600 text-[12.83px] font-normal font-['Manrope']">
                      {EngageTask?.comment
                        ? `${EngageTask?.comment?.total} Task available`
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
              <div className='px-3 justify-start items-center gap-[11px] hidden flx'>
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
                onClick={() =>
                  EngageTask?.comment
                    ? onOpen()
                    : toast.error('No task is avaialble')
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
                To receive your next social media page-comment task, click the
                Above. You'll get one task at a time, and you must complete the
                current task before a new one is generated.
              </div>
            </div>
          )}
        </div>
      </div>

      <ConfirmTaskModal
        isOpen={isOpen}
        onClose={onClose}
        task_type='engagement'
        goal='comment'
        title='Generate Comment Task'
      />
    </>
  )
}
