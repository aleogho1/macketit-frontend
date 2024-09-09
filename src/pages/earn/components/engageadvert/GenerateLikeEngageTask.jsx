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

export default function GenerateLikeEngageTask() {
  const [selected, setSelected] = useState()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { data: fetchTask } = usePerformTask(selected)
  const { isDarkMode } = useDarkMode()
  const frameImage = isDarkMode ? frameImageDark : frameImageLight
  const { data: EngageTask } = useGetEngageTask()
  console.log(EngageTask)

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
                    d='M40.6614 25.0861C41.4325 24.0671 41.8594 22.8187 41.8594 21.5198C41.8594 19.4589 40.7073 17.5082 38.853 16.4204C38.3757 16.1404 37.8321 15.9931 37.2787 15.9936H26.2723L26.5477 10.3527C26.6119 8.98949 26.13 7.69515 25.1937 6.70833C24.7341 6.22194 24.1798 5.83495 23.5648 5.57127C22.9498 5.30759 22.2873 5.17284 21.6182 5.17533C19.2314 5.17533 17.1201 6.78177 16.4867 9.08128L12.544 23.3557H12.5303V43.0002H34.2081C34.6304 43.0002 35.0435 42.9176 35.4244 42.7524C37.6092 41.8206 39.0183 39.6864 39.0183 37.318C39.0183 36.7397 38.9356 36.1705 38.7704 35.6198C39.5415 34.6008 39.9684 33.3524 39.9684 32.0534C39.9684 31.4751 39.8857 30.906 39.7205 30.3552C40.4916 29.3363 40.9185 28.0878 40.9185 26.7889C40.9093 26.2106 40.8267 25.6369 40.6614 25.0861ZM5.14062 24.8244V41.5315C5.14062 42.3439 5.79697 43.0002 6.60938 43.0002H9.59277V23.3557H6.60938C5.79697 23.3557 5.14062 24.012 5.14062 24.8244Z'
                    fill='#1877F2'
                  />
                </svg>
              </div>
              <div className='justify-center items-start gap-2 inline-flex'>
                <div className='max-w-[484px] flex-col justify-start items-center gap-3 inline-flex'>
                  <div className="text-white dark:text-black text-sm font-medium text-center font-['Manrope']">
                    Like Post on different Social Media Platforms
                  </div>
                  <div className="self-stretch dark:text-black text-center text-white w-11/12 m-auto text-xs font-normal font-['Manrope']">
                    Like Several Social Media Pages for Individuals, Businesses
                    and Organizations and Earn ₦3.5 per Like. The more pages you
                    like, the more you earn.
                  </div>
                  <div className='p-1 dark:bg-[#3793FF21] bg-white rounded justify-start items-start gap-3 inline-flex'>
                    <div className="text-center text-blue-600 text-[12.83px] font-normal font-['Manrope']">
                    {
                        EngageTask?.like ?  `${EngageTask?.like?.total} Task available` : 'No task available'
                      }                    
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
                onClick={() => EngageTask?.like ? onOpen() : toast.error('No task is available')}
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
                          To receive your next social media page-like task, Click Generate task.
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
        goal='like'
        title='Generate Like Task?'
      />
    </>
  )
}
