/* eslint-disable no-irregular-whitespace */

import { useNavigate } from 'react-router-dom'
// import frameImage from '../../../../assets/engageIcon237873.svg'
import frameImageLight from '../../../../assets/engageIcon237873.svg'
import { useState, useEffect, useContext } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Tab, Tabs, useDisclosure } from '@nextui-org/react'
import PostAdvertTasksCard from '../../PostAdvertTasksCard'
import IgGeneratedTask from '../IgGeneratedTask'
import ConfirmTaskModal from '../ConfirmTaskModal'
import { usePerformTask, useGetAdvertTask } from '../../../../api/earnApi'
import { useDarkMode } from 'usehooks-ts'
import frameImageDark from '../../../../assets/FrameHeaderDark.svg'
import { useGetProfile } from '../../../../api/profileApis'
import SocialLinkModal from '../../../components/SocialLinkModal'
import toast from 'react-hot-toast'
import { useQueryClient } from '@tanstack/react-query'
import { SocialAccountContext } from '../../../../context/SocialAccount'
import Icons from '../../../../components/Icon'

export default function GenerateTiktokTask() {
  const [selected, setSelected] = useState()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const {
    isOpen: isOpenVerify,
    onOpen: onOpenVerify,
    onClose: onCloseVerify,
  } = useDisclosure()
  const { data: fetchTask } = usePerformTask(selected, 'tiktok')

  const { isDarkMode } = useDarkMode()
  const frameImage = isDarkMode ? frameImageDark : frameImageLight
  const navigate = useNavigate()
  const { data: profileDeatils } = useGetProfile()
  const [active, setActive] = useState()
  const socialAccount = useContext(SocialAccountContext)
  const getSocial = () => {
    if (socialAccount) {
      for (const item of socialAccount) {
        item?.platform === 'tiktok' ? setActive(item) : ''
      }
    } else {
      for (const item of profileDeatils?.social_profiles) {
        item?.platform === 'tiktok' ? setActive(item) : ''
      }
    }
  }
  useEffect(() => {
    getSocial()
  }, [socialAccount, active])
  const queryClient = useQueryClient()

  const handOpenSocialModal = () => {
    if (active?.status === 'pending') {
      toast.success('Verification pending')
    } else if (
      active?.status === 'rejected' ||
      active?.status === 'idle' ||
      !active?.status
    ) {
      onOpenVerify()
    } else {
      onOpenVerify()
    }
    queryClient.invalidateQueries({ queryKey: ['get_profile'] })
  }
  const { data: advertTask } = useGetAdvertTask('TikTok')

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
            <div className="text-center text-fuchsia-400 text-sm font-medium font-['Manrope']">
              Go back
            </div>
          </div>
          <div className='self-stretch flex-col justify-start items-start flex'>
            <div className='self-stretch h-[447px] sm:pt-0 pb-6 dark:bg-white bg-stone-900 border border-stone-900 flex-col justify-center items-center gap-6 flex'>
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
                    d='M34.8307 16.9236C38.2597 19.0864 42.4604 20.359 46.9973 20.359V12.6558C46.1386 12.656 45.2822 12.5769 44.4422 12.4199V18.4833C39.9057 18.4833 35.7055 17.2109 32.2758 15.0483V30.7683C32.2758 38.6324 25.0507 45.0069 16.1389 45.0069C12.8137 45.0069 9.72286 44.1199 7.15546 42.5986C10.0858 45.2424 14.1723 46.8824 18.6933 46.8824C27.6058 46.8824 34.8311 40.5079 34.8311 32.6435V16.9236H34.8307ZM37.9828 9.15206C36.2303 7.46282 35.0796 5.27975 34.8307 2.86622V1.87549H32.4094C33.0189 4.94297 35.098 7.56362 37.9828 9.15206ZM12.7922 36.5641C11.8131 35.4315 11.2839 34.0457 11.2862 32.6209C11.2862 29.0243 14.5909 26.108 18.6681 26.108C19.4278 26.1077 20.183 26.2106 20.9073 26.4132V18.5378C20.0609 18.4355 19.2069 18.3919 18.3533 18.408V24.5378C17.6287 24.335 16.8731 24.2321 16.113 24.2327C12.036 24.2327 8.73151 27.1487 8.73151 30.7458C8.73151 33.2893 10.3832 35.4913 12.7922 36.5641Z'
                    fill='#FF004F'
                  />
                  <path
                    d='M32.2758 15.0481C35.7057 17.2108 39.9055 18.4832 44.4422 18.4832V12.4197C41.9098 11.9437 39.6681 10.7762 37.9826 9.15206C35.0976 7.56346 33.0189 4.94281 32.4094 1.87549H26.0496V32.6431C26.0351 36.2301 22.7361 39.1343 18.6677 39.1343C16.2705 39.1343 14.1406 38.1261 12.7918 36.5639C10.3832 35.4913 8.73132 33.2891 8.73132 30.746C8.73132 27.1492 12.0358 24.2329 16.1128 24.2329C16.894 24.2329 17.6468 24.3402 18.3531 24.5379V18.4081C9.59764 18.5678 2.55634 24.88 2.55634 32.6433C2.55634 36.5187 4.30973 40.0319 7.15563 42.5989C9.72303 44.1199 12.8136 45.0072 16.1391 45.0072C25.0511 45.0072 32.276 38.6322 32.276 30.7683L32.2758 15.0481Z'
                    fill='black'
                  />
                  <path
                    d='M44.4423 12.4193V10.7802C42.1587 10.7832 39.9203 10.219 37.9828 9.15187C39.6978 10.8086 41.9561 11.951 44.4423 12.4197M32.4094 1.87514C32.3513 1.58205 32.3067 1.28701 32.2758 0.990728V0H23.4943V30.768C23.4803 34.3546 20.1813 37.2588 16.1128 37.2588C14.9594 37.2604 13.8218 37.0224 12.7918 36.5641C14.1406 38.1259 16.2705 39.134 18.6677 39.134C22.7359 39.134 26.0352 36.23 26.0496 32.6431V1.8753L32.4094 1.87514ZM18.3536 18.4078V16.6625C17.6198 16.5739 16.88 16.5296 16.1394 16.5299C7.22648 16.5299 0.00158691 22.9047 0.00158691 30.768C0.00158691 35.698 2.84106 40.0427 7.15598 42.5984C4.31009 40.0315 2.55669 36.5182 2.55669 32.643C2.55669 24.8799 9.59781 18.5674 18.3536 18.4078Z'
                    fill='#00F2EA'
                  />
                </svg>
              </div>
              <div className='justify-center items-start gap-2 inline-flex'>
                <div className='max-w-[484px] flex-col justify-start items-center gap-3 inline-flex'>
                  <div className="text-white dark:text-black text-sm font-medium text-center font-['Manrope']">
                    Post Advert on your TikTok Accounts
                  </div>
                  <div className="self-stretch dark:text-black text-center text-white text-xs w-11/12 m-auto  font-normal font-['Manrope']">
                    Promote advertisements for different businesses and top
                    brands on your Tiktok page and earn ₦110 for each post. The
                    more you share, the more you earn.
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
            {active?.status ? (
              <div className='w-full pl-4 md:pl-8 mt-6 flex flex-col gap-y-2'>
                <h2 className='text-zinc-700 dark:text-white font-bold text-[16px]'>
                  Your Tiktok Profile Account
                </h2>
                {active?.status === 'verified' ? (
                  <p className='text-blue-300 dark:text-white font-semibold text-[12px] w-11/12'>
                    Your Tiktok task must be done from the below Tiktok profile
                    which has been linked to your MacketIT³ account
                  </p>
                ) : (
                  ''
                )}
                <div className='flex items-center gap-x-2'>
                  <div className='bg-zinc-700 dark:bg-white flex items-center justify-between text-black bg-opacity-50 py-2 w-11/12 md:w-12/12 px-4 rounded'>
                    {active?.link?.length > 30
                      ? active?.link?.substring(0, 30) + '(...)'
                      : active?.link}
                    <div
                      className={`${
                        (active?.status === 'verified' && 'text-green-800') ||
                        (active?.status === 'pending' && 'text-yellow-700') ||
                        (active?.status === 'idle' && 'text[#FF3D00]') ||
                        (active?.status === 'rejected' && 'text-[#FF3D00]')
                      } py-[6px] px-[6px] text-center rounded-full font-semibold`}
                    >
                      {active?.status.charAt(0).toUpperCase() +
                        active?.status?.slice(1)}
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              ''
            )}
          </div>
          {active?.status !== 'verified' && (
            <div className='self-stretch p-6 dark:bg-black bg-zinc-400 bg-opacity-30 justify-start items-start gap-[29px] inline-flex'>
              <div className='grow shrink basis-0 flex-col justify-start items-start gap-2.5 inline-flex'>
                <div className="text-center  text-base font-bold font-['Manrope']">
                  Link your TikTok Accounts
                </div>
                <div className="self-stretch dark:text-gray-400 text-stone-900 text-xs font-normal font-['Manrope']">
                  You need to link your TicTok Accounts to MacketIT before you
                  can start earning with your TikTok Accounts . Click the button
                  below to link your  TikTok Accounts now.
                </div>
                <div
                  onClick={handOpenSocialModal}
                  className='p-2 dark:bg-stone-900 cursor-pointer bg-white border border-violet-500 border-opacity-25 justify-center items-center gap-1 inline-flex'
                >
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    width='24'
                    height='24'
                    viewBox='0 0 47 47'
                    fill='none'
                  >
                    <path
                      d='M34.8307 16.9236C38.2597 19.0864 42.4604 20.359 46.9973 20.359V12.6558C46.1386 12.656 45.2822 12.5769 44.4422 12.4199V18.4833C39.9057 18.4833 35.7055 17.2109 32.2758 15.0483V30.7683C32.2758 38.6324 25.0507 45.0069 16.1389 45.0069C12.8137 45.0069 9.72286 44.1199 7.15546 42.5986C10.0858 45.2424 14.1723 46.8824 18.6933 46.8824C27.6058 46.8824 34.8311 40.5079 34.8311 32.6435V16.9236H34.8307ZM37.9828 9.15206C36.2303 7.46282 35.0796 5.27975 34.8307 2.86622V1.87549H32.4094C33.0189 4.94297 35.098 7.56362 37.9828 9.15206ZM12.7922 36.5641C11.8131 35.4315 11.2839 34.0457 11.2862 32.6209C11.2862 29.0243 14.5909 26.108 18.6681 26.108C19.4278 26.1077 20.183 26.2106 20.9073 26.4132V18.5378C20.0609 18.4355 19.2069 18.3919 18.3533 18.408V24.5378C17.6287 24.335 16.8731 24.2321 16.113 24.2327C12.036 24.2327 8.73151 27.1487 8.73151 30.7458C8.73151 33.2893 10.3832 35.4913 12.7922 36.5641Z'
                      fill='#FF004F'
                    />
                    <path
                      d='M32.2758 15.0481C35.7057 17.2108 39.9055 18.4832 44.4422 18.4832V12.4197C41.9098 11.9437 39.6681 10.7762 37.9826 9.15206C35.0976 7.56346 33.0189 4.94281 32.4094 1.87549H26.0496V32.6431C26.0351 36.2301 22.7361 39.1343 18.6677 39.1343C16.2705 39.1343 14.1406 38.1261 12.7918 36.5639C10.3832 35.4913 8.73132 33.2891 8.73132 30.746C8.73132 27.1492 12.0358 24.2329 16.1128 24.2329C16.894 24.2329 17.6468 24.3402 18.3531 24.5379V18.4081C9.59764 18.5678 2.55634 24.88 2.55634 32.6433C2.55634 36.5187 4.30973 40.0319 7.15563 42.5989C9.72303 44.1199 12.8136 45.0072 16.1391 45.0072C25.0511 45.0072 32.276 38.6322 32.276 30.7683L32.2758 15.0481Z'
                      fill='black'
                    />
                    <path
                      d='M44.4423 12.4193V10.7802C42.1587 10.7832 39.9203 10.219 37.9828 9.15187C39.6978 10.8086 41.9561 11.951 44.4423 12.4197M32.4094 1.87514C32.3513 1.58205 32.3067 1.28701 32.2758 0.990728V0H23.4943V30.768C23.4803 34.3546 20.1813 37.2588 16.1128 37.2588C14.9594 37.2604 13.8218 37.0224 12.7918 36.5641C14.1406 38.1259 16.2705 39.134 18.6677 39.134C22.7359 39.134 26.0352 36.23 26.0496 32.6431V1.8753L32.4094 1.87514ZM18.3536 18.4078V16.6625C17.6198 16.5739 16.88 16.5296 16.1394 16.5299C7.22648 16.5299 0.00158691 22.9047 0.00158691 30.768C0.00158691 35.698 2.84106 40.0427 7.15598 42.5984C4.31009 40.0315 2.55669 36.5182 2.55669 32.643C2.55669 24.8799 9.59781 18.5674 18.3536 18.4078Z'
                      fill='#00F2EA'
                    />
                  </svg>
                  <div className="text-center text-[12.83px] font-bold font-['Manrope']">
                    Link TikTok account
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
                  className='dark:stroke-white stroke-[#B1B1B1] '
                />
              </svg>
            </div>
          )}
          {active?.status === 'verified' && (
            <>
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
                  {fetchTask?.length >= 5 && (
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
                            className='dark:stroke-[#B1B1B1] stroke-[#1E1E1E] '
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
                            className='dark:stroke-[#B1B1B1] stroke-[#1E1E1E] '
                          />
                        </svg>
                        <div className="text-center dark:text-[#B1B1B1] text-stone-900 text-sm font-medium font-['Manrope']">
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
                      Earn steady income by posting adverts of businesses and
                      top brands on your social media page. To post adverts on
                      Facebook, Instagram, Twitter or Tiktok, you MUST have
                      atleast 500 Followers on your social media account.
                    </div>
                  </div>
                  <div
                    onClick={() =>
                      advertTask?.length !== 0
                        ? onOpen()
                        : toast.error('No task is available')
                    }
                    className='w-[290px] px-6 cursor-pointer py-3.5 dark:bg-white bg-fuchsia-400 rounded-[100px] justify-center items-center gap-2 inline-flex'
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
                    To receive your next Tiktok advert task, click the Above.
                    You'll get one task at a time, and you must complete the
                    current task before a new one is generated.
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>

      <ConfirmTaskModal
        isOpen={isOpen}
        onClose={onClose}
        task_type='advert'
        platform='tiktok'
      />
      {isOpenVerify && (
        <SocialLinkModal
          type='tiktok'
          platform='tiktok'
          icon='tik-tok'
          LogoBand={
            <svg
              xmlns='http://www.w3.org/2000/svg'
              width='24'
              height='24'
              viewBox='0 0 47 47'
              fill='none'
            >
              <path
                d='M34.8307 16.9236C38.2597 19.0864 42.4604 20.359 46.9973 20.359V12.6558C46.1386 12.656 45.2822 12.5769 44.4422 12.4199V18.4833C39.9057 18.4833 35.7055 17.2109 32.2758 15.0483V30.7683C32.2758 38.6324 25.0507 45.0069 16.1389 45.0069C12.8137 45.0069 9.72286 44.1199 7.15546 42.5986C10.0858 45.2424 14.1723 46.8824 18.6933 46.8824C27.6058 46.8824 34.8311 40.5079 34.8311 32.6435V16.9236H34.8307ZM37.9828 9.15206C36.2303 7.46282 35.0796 5.27975 34.8307 2.86622V1.87549H32.4094C33.0189 4.94297 35.098 7.56362 37.9828 9.15206ZM12.7922 36.5641C11.8131 35.4315 11.2839 34.0457 11.2862 32.6209C11.2862 29.0243 14.5909 26.108 18.6681 26.108C19.4278 26.1077 20.183 26.2106 20.9073 26.4132V18.5378C20.0609 18.4355 19.2069 18.3919 18.3533 18.408V24.5378C17.6287 24.335 16.8731 24.2321 16.113 24.2327C12.036 24.2327 8.73151 27.1487 8.73151 30.7458C8.73151 33.2893 10.3832 35.4913 12.7922 36.5641Z'
                fill='#FF004F'
              />
              <path
                d='M32.2758 15.0481C35.7057 17.2108 39.9055 18.4832 44.4422 18.4832V12.4197C41.9098 11.9437 39.6681 10.7762 37.9826 9.15206C35.0976 7.56346 33.0189 4.94281 32.4094 1.87549H26.0496V32.6431C26.0351 36.2301 22.7361 39.1343 18.6677 39.1343C16.2705 39.1343 14.1406 38.1261 12.7918 36.5639C10.3832 35.4913 8.73132 33.2891 8.73132 30.746C8.73132 27.1492 12.0358 24.2329 16.1128 24.2329C16.894 24.2329 17.6468 24.3402 18.3531 24.5379V18.4081C9.59764 18.5678 2.55634 24.88 2.55634 32.6433C2.55634 36.5187 4.30973 40.0319 7.15563 42.5989C9.72303 44.1199 12.8136 45.0072 16.1391 45.0072C25.0511 45.0072 32.276 38.6322 32.276 30.7683L32.2758 15.0481Z'
                className='dark:fill-white fill-black'
              />
              <path
                d='M44.4423 12.4193V10.7802C42.1587 10.7832 39.9203 10.219 37.9828 9.15187C39.6978 10.8086 41.9561 11.951 44.4423 12.4197M32.4094 1.87514C32.3513 1.58205 32.3067 1.28701 32.2758 0.990728V0H23.4943V30.768C23.4803 34.3546 20.1813 37.2588 16.1128 37.2588C14.9594 37.2604 13.8218 37.0224 12.7918 36.5641C14.1406 38.1259 16.2705 39.134 18.6677 39.134C22.7359 39.134 26.0352 36.23 26.0496 32.6431V1.8753L32.4094 1.87514ZM18.3536 18.4078V16.6625C17.6198 16.5739 16.88 16.5296 16.1394 16.5299C7.22648 16.5299 0.00158691 22.9047 0.00158691 30.768C0.00158691 35.698 2.84106 40.0427 7.15598 42.5984C4.31009 40.0315 2.55669 36.5182 2.55669 32.643C2.55669 24.8799 9.59781 18.5674 18.3536 18.4078Z'
                fill='#00F2EA'
              />
            </svg>
          }
          isOpen={isOpenVerify}
          onClose={onCloseVerify}
        />
      )}
    </>
  )
}
