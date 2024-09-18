/* eslint-disable no-irregular-whitespace */

import { useNavigate } from 'react-router-dom'
import frameImageLight from '../../../../assets/engageIcon237873.svg'
import { useEffect, useState, useContext } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Tab, Tabs, useDisclosure } from '@nextui-org/react'
import PostAdvertTasksCard from '../../PostAdvertTasksCard'
import IgGeneratedTask from '.././IgGeneratedTask'
import ConfirmTaskModal from '.././ConfirmTaskModal'
import { usePerformTask, useGetAdvertTask } from '../../../../api/earnApi'
import { useDarkMode } from 'usehooks-ts'
import frameImageDark from '../../../../assets/FrameHeaderDark.svg'
import { useGetProfile } from '../../../../api/profileApis'
import SocialLinkModal from '../../../components/SocialLinkModal'
import toast from 'react-hot-toast'
import { useQueryClient } from '@tanstack/react-query'
import Icons from '../../../../components/Icon'
import { SocialAccountContext } from '../../../../context/SocialAccount'

export default function GenerateIgTask() {
  const [selected, setSelected] = useState()
  const { isOpen, onOpen, onClose } = useDisclosure()

  const {
    isOpen: isOpenVerify,
    onOpen: onOpenVerify,
    onClose: onCloseVerify,
  } = useDisclosure()
  const { data: fetchTask } = usePerformTask(selected, 'instagram')
  const { isDarkMode } = useDarkMode()
  const frameImage = isDarkMode ? frameImageDark : frameImageLight
  const { data: profileDeatils } = useGetProfile()
  const [active, setActive] = useState()
  const socialAccount = useContext(SocialAccountContext)
  const getSocial = () => {
    if (socialAccount) {
      for (const item of socialAccount) {
        item?.platform === 'instagram' ? setActive(item) : ''
      }
    } else {
      for (const item of profileDeatils?.social_profiles) {
        item?.platform === 'instagram' ? setActive(item) : ''
      }
    }
  }
  useEffect(() => {
    getSocial()
  }, [socialAccount, active])
  const queryClient = useQueryClient()

  const handOpenSocialModal = () => {
    if (
      active?.status === 'rejected' ||
      active?.status === 'idle' ||
      !active?.status
    ) {
      onOpenVerify()
    } else if (active?.status === 'pending') {
      toast.success('Verification pending')
    } else {
      onOpenVerify()
    }
    queryClient.invalidateQueries({ queryKey: ['get_profile'] })
  }
  const { data: advertTask } = useGetAdvertTask('Instagram')

  const navigate = useNavigate()
  return (
    <>
      <div>
        <div className='w-full min-h-screen  p-3 flex-col justify-start items-start gap-3 flex'>
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
            <div className='self-stretch h-[447px] pb-6 dark:bg-white bg-stone-900 border border-stone-900 flex-col justify-center items-center gap-6 flex'>
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
                    d='M35.9844 0H11.0156C4.93186 0 0 4.93186 0 11.0156V35.9844C0 42.0681 4.93186 47 11.0156 47H35.9844C42.0681 47 47 42.0681 47 35.9844V11.0156C47 4.93186 42.0681 0 35.9844 0Z'
                    fill='url(#paint0_radial_4836_34871)'
                  />
                  <path
                    d='M35.9844 0H11.0156C4.93186 0 0 4.93186 0 11.0156V35.9844C0 42.0681 4.93186 47 11.0156 47H35.9844C42.0681 47 47 42.0681 47 35.9844V11.0156C47 4.93186 42.0681 0 35.9844 0Z'
                    fill='url(#paint1_radial_4836_34871)'
                  />
                  <path
                    d='M23.5017 5.14062C18.5156 5.14062 17.8897 5.16247 15.9315 5.25152C13.977 5.34111 12.6428 5.65046 11.4755 6.10449C10.2678 6.57339 9.24358 7.20073 8.22316 8.22151C7.20183 9.24211 6.57449 10.2664 6.10413 11.4735C5.64881 12.6412 5.33909 13.9759 5.25115 15.9295C5.16357 17.8879 5.14062 18.514 5.14062 23.5002C5.14062 28.4864 5.16266 29.1103 5.25152 31.0685C5.34148 33.023 5.65083 34.3572 6.10449 35.5245C6.57376 36.7322 7.2011 37.7564 8.22188 38.7768C9.24211 39.7982 10.2664 40.427 11.4731 40.8959C12.6413 41.3499 13.9757 41.6593 15.9299 41.7489C17.8883 41.8379 18.5136 41.8597 23.4994 41.8597C28.486 41.8597 29.1099 41.8379 31.0681 41.7489C33.0226 41.6593 34.3583 41.3499 35.5265 40.8959C36.7336 40.427 37.7564 39.7982 38.7765 38.7768C39.7978 37.7564 40.425 36.7322 40.8955 35.525C41.3468 34.3572 41.6567 33.0226 41.7485 31.0688C41.8364 29.1106 41.8594 28.4864 41.8594 23.5002C41.8594 18.514 41.8364 17.8883 41.7485 15.9299C41.6567 13.9753 41.3468 12.6413 40.8955 11.4741C40.425 10.2664 39.7978 9.24211 38.7765 8.22151C37.7553 7.20036 36.734 6.57302 35.5254 6.10468C34.355 5.65046 33.0201 5.34093 31.0655 5.25152C29.1071 5.16247 28.4837 5.14062 23.496 5.14062H23.5017ZM21.8546 8.44917C22.3435 8.44843 22.889 8.44917 23.5017 8.44917C28.4038 8.44917 28.9847 8.46679 30.9205 8.55473C32.7105 8.63662 33.6821 8.93569 34.3293 9.18703C35.1861 9.5197 35.7969 9.91755 36.4391 10.5603C37.0817 11.2029 37.4794 11.8148 37.813 12.6716C38.0643 13.3179 38.3638 14.2895 38.4453 16.0795C38.5332 18.015 38.5523 18.5962 38.5523 23.496C38.5523 28.3957 38.5332 28.9772 38.4453 30.9124C38.3634 32.7025 38.0643 33.674 37.813 34.3205C37.4803 35.1773 37.0817 35.7874 36.4391 36.4296C35.7966 37.0722 35.1865 37.4698 34.3293 37.8027C33.6828 38.0551 32.7105 38.3535 30.9205 38.4354C28.985 38.5233 28.4038 38.5424 23.5017 38.5424C18.5993 38.5424 18.0183 38.5233 16.083 38.4354C14.293 38.3527 13.3214 38.0537 12.6737 37.8023C11.817 37.4695 11.2049 37.0718 10.5623 36.4292C9.91975 35.7866 9.52209 35.1762 9.1885 34.319C8.93716 33.6726 8.63772 32.701 8.5562 30.9109C8.46826 28.9755 8.45064 28.3942 8.45064 23.4914C8.45064 18.5887 8.46826 18.0104 8.5562 16.0749C8.63809 14.2849 8.93716 13.3133 9.1885 12.6661C9.52136 11.8093 9.91975 11.1974 10.5625 10.5548C11.2051 9.91223 11.817 9.51438 12.6738 9.18097C13.321 8.92853 14.293 8.63019 16.083 8.54794C17.7766 8.47138 18.433 8.44843 21.8546 8.44458V8.44917ZM33.3019 11.4976C32.0856 11.4976 31.0988 12.4835 31.0988 13.6999C31.0988 14.9163 32.0856 15.9031 33.3019 15.9031C34.5182 15.9031 35.505 14.9163 35.505 13.6999C35.505 12.4836 34.5182 11.4968 33.3019 11.4968V11.4976ZM23.5017 14.0717C18.2949 14.0717 14.0734 18.2933 14.0734 23.5002C14.0734 28.7071 18.2949 32.9266 23.5017 32.9266C28.7086 32.9266 32.9286 28.7071 32.9286 23.5002C32.9286 18.2935 28.7082 14.0717 23.5013 14.0717H23.5017ZM23.5017 17.3803C26.8814 17.3803 29.6216 20.12 29.6216 23.5002C29.6216 26.88 26.8814 29.6201 23.5017 29.6201C20.1217 29.6201 17.3819 26.88 17.3819 23.5002C17.3819 20.12 20.1217 17.3803 23.5017 17.3803Z'
                    fill='white'
                  />
                  <defs>
                    <radialGradient
                      id='paint0_radial_4836_34871'
                      cx='0'
                      cy='0'
                      r='1'
                      gradientUnits='userSpaceOnUse'
                      gradientTransform='translate(12.4844 50.6199) rotate(-90) scale(46.5805 43.3235)'
                    >
                      <stop stopColor='#FFDD55' />
                      <stop offset='0.1' stopColor='#FFDD55' />
                      <stop offset='0.5' stopColor='#FF543E' />
                      <stop offset='1' stopColor='#C837AB' />
                    </radialGradient>
                    <radialGradient
                      id='paint1_radial_4836_34871'
                      cx='0'
                      cy='0'
                      r='1'
                      gradientUnits='userSpaceOnUse'
                      gradientTransform='translate(-7.87268 3.38565) rotate(78.681) scale(20.8217 85.8279)'
                    >
                      <stop stopColor='#3771C8' />
                      <stop offset='0.128' stopColor='#3771C8' />
                      <stop offset='1' stopColor='#6600FF' stopOpacity='0' />
                    </radialGradient>
                  </defs>
                </svg>
              </div>
              <div className='justify-center items-start gap-2 inline-flex'>
                <div className='max-w-[484px] flex-col justify-start items-center gap-3 inline-flex'>
                  <div className="dark:text-black text-white text-sm text-center font-medium font-['Manrope']">
                    Post adverts on Instagram
                  </div>
                  <div className="self-stretch dark:text-black text-center text-white w-11/12 m-auto text-xs font-normal font-['Manrope']">
                    Promote advertisements for different businesses and top
                    brands on your Instagam page and earn ₦110 for each post.
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
            {active?.status ? (
              <div className='w-full pl-4 md:pl-8 mt-6 flex flex-col gap-y-2'>
                <h2 className='text-zinc-700 dark:text-white font-bold text-[16px]'>
                  Your Instagram Profile Account
                </h2>
                {active?.status === 'verified' ? (
                  <p className='text-blue-300 dark:text-white font-semibold text-[12px] w-11/12'>
                    Your Instagram task must be done from the below Instagram
                    profile which has been linked to your MacketIT³ account
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
                <div className="text-center dark:text-white text-primaryText text-base font-bold font-['Manrope']">
                  Link your Instagram Account
                </div>
                <div className="self-stretch dark:text-gray-400 text-primaryText text-xs font-normal font-['Manrope']">
                  You need to link your Instagram Accounts to MacketIT before
                  you can start earning with your Instagram Accounts . Click the
                  button below to link your Instagram Accounts now.
                </div>
                <div
                  onClick={handOpenSocialModal}
                  className='p-2 dark:bg-stone-900 cursor-pointer bg-white border border-violet-500 border-opacity-25 justify-center items-center gap-1 inline-flex'
                >
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    width='20'
                    height='20'
                    viewBox='0 0 20 20'
                    fill='none'
                  >
                    <path
                      d='M15.3125 0H4.6875C2.09867 0 0 2.09867 0 4.6875V15.3125C0 17.9013 2.09867 20 4.6875 20H15.3125C17.9013 20 20 17.9013 20 15.3125V4.6875C20 2.09867 17.9013 0 15.3125 0Z'
                      fill='url(#paint0_radial_3736_28371)'
                    />
                    <path
                      d='M15.3125 0H4.6875C2.09867 0 0 2.09867 0 4.6875V15.3125C0 17.9013 2.09867 20 4.6875 20H15.3125C17.9013 20 20 17.9013 20 15.3125V4.6875C20 2.09867 17.9013 0 15.3125 0Z'
                      fill='url(#paint1_radial_3736_28371)'
                    />
                    <path
                      d='M10.0007 2.1875C7.87898 2.1875 7.61266 2.1968 6.77938 2.23469C5.94766 2.27281 5.37992 2.40445 4.8832 2.59766C4.3693 2.79719 3.93344 3.06414 3.49922 3.49852C3.06461 3.93281 2.79766 4.36867 2.5975 4.88234C2.40375 5.37922 2.27195 5.94719 2.23453 6.77852C2.19727 7.61188 2.1875 7.87828 2.1875 10.0001C2.1875 12.1219 2.19688 12.3873 2.23469 13.2206C2.27297 14.0523 2.40461 14.6201 2.59766 15.1168C2.79734 15.6307 3.0643 16.0666 3.49867 16.5008C3.93281 16.9354 4.36867 17.203 4.88219 17.4025C5.3793 17.5957 5.94711 17.7273 6.77867 17.7655C7.61203 17.8034 7.87813 17.8127 9.99977 17.8127C12.1217 17.8127 12.3872 17.8034 13.2205 17.7655C14.0522 17.7273 14.6205 17.5957 15.1177 17.4025C15.6313 17.203 16.0666 16.9354 16.5006 16.5008C16.9352 16.0666 17.2021 15.6307 17.4023 15.117C17.5944 14.6201 17.7262 14.0522 17.7653 13.2208C17.8027 12.3875 17.8125 12.1219 17.8125 10.0001C17.8125 7.87828 17.8027 7.61203 17.7653 6.77867C17.7262 5.94695 17.5944 5.3793 17.4023 4.88258C17.2021 4.36867 16.9352 3.93281 16.5006 3.49852C16.0661 3.06398 15.6315 2.79703 15.1172 2.59773C14.6191 2.40445 14.0511 2.27273 13.2194 2.23469C12.386 2.1968 12.1207 2.1875 9.99828 2.1875H10.0007ZM9.29984 3.59539C9.50789 3.59508 9.74 3.59539 10.0007 3.59539C12.0867 3.59539 12.3339 3.60289 13.1577 3.64031C13.9194 3.67516 14.3328 3.80242 14.6082 3.90938C14.9728 4.05094 15.2327 4.22023 15.506 4.49375C15.7795 4.76719 15.9487 5.02758 16.0906 5.39219C16.1976 5.66719 16.325 6.08063 16.3597 6.84234C16.3971 7.66594 16.4052 7.91328 16.4052 9.99828C16.4052 12.0833 16.3971 12.3307 16.3597 13.1542C16.3248 13.9159 16.1976 14.3294 16.0906 14.6045C15.9491 14.9691 15.7795 15.2287 15.506 15.502C15.2326 15.7754 14.973 15.9446 14.6082 16.0863C14.3331 16.1937 13.9194 16.3206 13.1577 16.3555C12.3341 16.3929 12.0867 16.401 10.0007 16.401C7.91461 16.401 7.66734 16.3929 6.84383 16.3555C6.08211 16.3203 5.66867 16.193 5.39305 16.0861C5.02852 15.9445 4.76805 15.7752 4.49461 15.5018C4.22117 15.2284 4.05195 14.9686 3.91 14.6038C3.80305 14.3287 3.67562 13.9153 3.64094 13.1536C3.60352 12.33 3.59602 12.0827 3.59602 9.99633C3.59602 7.91008 3.60352 7.66398 3.64094 6.84039C3.67578 6.07867 3.80305 5.66523 3.91 5.38984C4.05164 5.02523 4.22117 4.76484 4.49469 4.49141C4.76813 4.21797 5.02852 4.04867 5.39312 3.9068C5.66852 3.79938 6.08211 3.67242 6.84383 3.63742C7.56453 3.60484 7.84383 3.59508 9.29984 3.59344V3.59539ZM14.171 4.89258C13.6534 4.89258 13.2335 5.31211 13.2335 5.82977C13.2335 6.34734 13.6534 6.76727 14.171 6.76727C14.6886 6.76727 15.1085 6.34734 15.1085 5.82977C15.1085 5.31219 14.6886 4.89227 14.171 4.89227V4.89258ZM10.0007 5.98797C7.78508 5.98797 5.98867 7.78438 5.98867 10.0001C5.98867 12.2158 7.78508 14.0113 10.0007 14.0113C12.2164 14.0113 14.0122 12.2158 14.0122 10.0001C14.0122 7.78445 12.2163 5.98797 10.0005 5.98797H10.0007ZM10.0007 7.39586C11.4389 7.39586 12.6049 8.56172 12.6049 10.0001C12.6049 11.4383 11.4389 12.6043 10.0007 12.6043C8.56242 12.6043 7.39656 11.4383 7.39656 10.0001C7.39656 8.56172 8.56242 7.39586 10.0007 7.39586Z'
                      fill='white'
                    />
                    <defs>
                      <radialGradient
                        id='paint0_radial_3736_28371'
                        cx='0'
                        cy='0'
                        r='1'
                        gradientUnits='userSpaceOnUse'
                        gradientTransform='translate(5.3125 21.5404) rotate(-90) scale(19.8215 18.4355)'
                      >
                        <stop stopColor='#FFDD55' />
                        <stop offset='0.1' stopColor='#FFDD55' />
                        <stop offset='0.5' stopColor='#FF543E' />
                        <stop offset='1' stopColor='#C837AB' />
                      </radialGradient>
                      <radialGradient
                        id='paint1_radial_3736_28371'
                        cx='0'
                        cy='0'
                        r='1'
                        gradientUnits='userSpaceOnUse'
                        gradientTransform='translate(-3.35008 1.4407) rotate(78.681) scale(8.86031 36.5225)'
                      >
                        <stop stopColor='#3771C8' />
                        <stop offset='0.128' stopColor='#3771C8' />
                        <stop offset='1' stopColor='#6600FF' stopOpacity='0' />
                      </radialGradient>
                    </defs>
                  </svg>
                  <div className="text-center dark:text-white text-primaryText text-[12.83px] font-bold font-['Manrope']">
                    Link Instagram account
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
                    className='w-[290px] dark:bg-white px-6 cursor-pointer py-3.5 primaryBg rounded-[100px] justify-center items-center gap-2 inline-flex'
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
                    To receive your next Instagram advert task, click the Above.
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
        platform='instagram'
      />

      {isOpenVerify && (
        <SocialLinkModal
          type='instagram'
          platform='instagram'
          icon='instagram'
          LogoBand={
            <svg
              xmlns='http://www.w3.org/2000/svg'
              width='20'
              height='20'
              viewBox='0 0 20 20'
              fill='none'
            >
              <path
                d='M15.3125 0H4.6875C2.09867 0 0 2.09867 0 4.6875V15.3125C0 17.9013 2.09867 20 4.6875 20H15.3125C17.9013 20 20 17.9013 20 15.3125V4.6875C20 2.09867 17.9013 0 15.3125 0Z'
                fill='url(#paint0_radial_3736_28371)'
              />
              <path
                d='M15.3125 0H4.6875C2.09867 0 0 2.09867 0 4.6875V15.3125C0 17.9013 2.09867 20 4.6875 20H15.3125C17.9013 20 20 17.9013 20 15.3125V4.6875C20 2.09867 17.9013 0 15.3125 0Z'
                fill='url(#paint1_radial_3736_28371)'
              />
              <path
                d='M10.0007 2.1875C7.87898 2.1875 7.61266 2.1968 6.77938 2.23469C5.94766 2.27281 5.37992 2.40445 4.8832 2.59766C4.3693 2.79719 3.93344 3.06414 3.49922 3.49852C3.06461 3.93281 2.79766 4.36867 2.5975 4.88234C2.40375 5.37922 2.27195 5.94719 2.23453 6.77852C2.19727 7.61188 2.1875 7.87828 2.1875 10.0001C2.1875 12.1219 2.19688 12.3873 2.23469 13.2206C2.27297 14.0523 2.40461 14.6201 2.59766 15.1168C2.79734 15.6307 3.0643 16.0666 3.49867 16.5008C3.93281 16.9354 4.36867 17.203 4.88219 17.4025C5.3793 17.5957 5.94711 17.7273 6.77867 17.7655C7.61203 17.8034 7.87813 17.8127 9.99977 17.8127C12.1217 17.8127 12.3872 17.8034 13.2205 17.7655C14.0522 17.7273 14.6205 17.5957 15.1177 17.4025C15.6313 17.203 16.0666 16.9354 16.5006 16.5008C16.9352 16.0666 17.2021 15.6307 17.4023 15.117C17.5944 14.6201 17.7262 14.0522 17.7653 13.2208C17.8027 12.3875 17.8125 12.1219 17.8125 10.0001C17.8125 7.87828 17.8027 7.61203 17.7653 6.77867C17.7262 5.94695 17.5944 5.3793 17.4023 4.88258C17.2021 4.36867 16.9352 3.93281 16.5006 3.49852C16.0661 3.06398 15.6315 2.79703 15.1172 2.59773C14.6191 2.40445 14.0511 2.27273 13.2194 2.23469C12.386 2.1968 12.1207 2.1875 9.99828 2.1875H10.0007ZM9.29984 3.59539C9.50789 3.59508 9.74 3.59539 10.0007 3.59539C12.0867 3.59539 12.3339 3.60289 13.1577 3.64031C13.9194 3.67516 14.3328 3.80242 14.6082 3.90938C14.9728 4.05094 15.2327 4.22023 15.506 4.49375C15.7795 4.76719 15.9487 5.02758 16.0906 5.39219C16.1976 5.66719 16.325 6.08063 16.3597 6.84234C16.3971 7.66594 16.4052 7.91328 16.4052 9.99828C16.4052 12.0833 16.3971 12.3307 16.3597 13.1542C16.3248 13.9159 16.1976 14.3294 16.0906 14.6045C15.9491 14.9691 15.7795 15.2287 15.506 15.502C15.2326 15.7754 14.973 15.9446 14.6082 16.0863C14.3331 16.1937 13.9194 16.3206 13.1577 16.3555C12.3341 16.3929 12.0867 16.401 10.0007 16.401C7.91461 16.401 7.66734 16.3929 6.84383 16.3555C6.08211 16.3203 5.66867 16.193 5.39305 16.0861C5.02852 15.9445 4.76805 15.7752 4.49461 15.5018C4.22117 15.2284 4.05195 14.9686 3.91 14.6038C3.80305 14.3287 3.67562 13.9153 3.64094 13.1536C3.60352 12.33 3.59602 12.0827 3.59602 9.99633C3.59602 7.91008 3.60352 7.66398 3.64094 6.84039C3.67578 6.07867 3.80305 5.66523 3.91 5.38984C4.05164 5.02523 4.22117 4.76484 4.49469 4.49141C4.76813 4.21797 5.02852 4.04867 5.39312 3.9068C5.66852 3.79938 6.08211 3.67242 6.84383 3.63742C7.56453 3.60484 7.84383 3.59508 9.29984 3.59344V3.59539ZM14.171 4.89258C13.6534 4.89258 13.2335 5.31211 13.2335 5.82977C13.2335 6.34734 13.6534 6.76727 14.171 6.76727C14.6886 6.76727 15.1085 6.34734 15.1085 5.82977C15.1085 5.31219 14.6886 4.89227 14.171 4.89227V4.89258ZM10.0007 5.98797C7.78508 5.98797 5.98867 7.78438 5.98867 10.0001C5.98867 12.2158 7.78508 14.0113 10.0007 14.0113C12.2164 14.0113 14.0122 12.2158 14.0122 10.0001C14.0122 7.78445 12.2163 5.98797 10.0005 5.98797H10.0007ZM10.0007 7.39586C11.4389 7.39586 12.6049 8.56172 12.6049 10.0001C12.6049 11.4383 11.4389 12.6043 10.0007 12.6043C8.56242 12.6043 7.39656 11.4383 7.39656 10.0001C7.39656 8.56172 8.56242 7.39586 10.0007 7.39586Z'
                fill='white'
              />
              <defs>
                <radialGradient
                  id='paint0_radial_3736_28371'
                  cx='0'
                  cy='0'
                  r='1'
                  gradientUnits='userSpaceOnUse'
                  gradientTransform='translate(5.3125 21.5404) rotate(-90) scale(19.8215 18.4355)'
                >
                  <stop stopColor='#FFDD55' />
                  <stop offset='0.1' stopColor='#FFDD55' />
                  <stop offset='0.5' stopColor='#FF543E' />
                  <stop offset='1' stopColor='#C837AB' />
                </radialGradient>
                <radialGradient
                  id='paint1_radial_3736_28371'
                  cx='0'
                  cy='0'
                  r='1'
                  gradientUnits='userSpaceOnUse'
                  gradientTransform='translate(-3.35008 1.4407) rotate(78.681) scale(8.86031 36.5225)'
                >
                  <stop stopColor='#3771C8' />
                  <stop offset='0.128' stopColor='#3771C8' />
                  <stop offset='1' stopColor='#6600FF' stopOpacity='0' />
                </radialGradient>
              </defs>
            </svg>
          }
          isOpen={isOpenVerify}
          onClose={onCloseVerify}
        />
      )}
    </>
  )
}
