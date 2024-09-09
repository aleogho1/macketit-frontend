/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
/* eslint-disable no-irregular-whitespace */

import { Button } from '@nextui-org/button'
import { Card } from '@nextui-org/card'
import { Image } from '@nextui-org/image'
import { ChevronRight } from 'lucide-react'
import { FaArrowRightLong } from 'react-icons/fa6'
import selfieImage from '../../assets/selfie.svg'
import readingImage from '../../assets/reading-side.svg'
import { useContext, useEffect, useState } from 'react'
import SelectPaymentmodal from '../transaction/components/SelectPaymentmodal'
import { useDisclosure } from '@nextui-org/react'
import { useNavigate } from 'react-router-dom'
import { useFetchBallance } from '../../api/walletApi'
import { useGetProfile } from '../../api/profileApis'
import FundWalletModal from './FundWalletModal'
import WithdrawWalletModal from './WithdrawWalletModal'
import { dashboardContext } from '../../context/Dashboard'
import SocialLinkModal from '../components/SocialLinkModal'
import SocialLinkOption from '../components/SocialLinkOption'
import toast from 'react-hot-toast'
import Loader from '../Loader'
import VatModal from './VatModal'
import Cookies from 'js-cookie';
import { useGetUserPrefence } from '../../api/settingsApis'
import { useDarkPref, useLightPref } from '../../hooks/usePref'
import { usePerformTaskStatus } from '../../api/earnApi'
import API from '../../services/AxiosInstance'
import Icons from '../../components/Icon'

export default function Welcome({ onNotificationClick }) {
  const [profile, setProfile] = useState(true)
  const [linkIg, setLinkIg] = useState(true)
  const [showUp, setShowUp] = useState()
  const closeShowup = () => {
    setShowUp(false)
    Cookies.set('newUser', 'false', {expires: 30})
  }
  const { isOpen, onOpen, onClose } = useDisclosure()
  const {
    isOpen: openWithdraw,
    onOpen: onOpenWithdraw,
    onClose: onCloseWithdraw,
  } = useDisclosure()
  const {
    isOpen: isOpenVerify,
    onOpen: onOpenVerify,
    onClose: onCloseVerify,
  } = useDisclosure()
  const navigate = useNavigate()
  const { data: showBalance } = useFetchBallance()
  const { data: userDetails } = useGetProfile()
  const { data: performed_tasks} = usePerformTaskStatus('pending')
  
  const { isTablet } = useContext(dashboardContext)

  const handOpenSocialModal = () => {
   onOpenVerify()
  }



  useEffect(() => {
    Cookies.get('newUser') === 'false' ? setShowUp(false) : setShowUp(true)
  }, [])

  return (
    <>
    {userDetails ? 
    <div>
      <div className='p-3  flex-col justify-start items-start gap-3 inline-flex relative'>
        {showUp ? (
          <div className=' w-full lg:-mt-20 px-[25px] py-[13px] bg-blue-500 justify-start items-start gap-[29px] inline-flex'>
            <div className='grow shrink w-full basis-0 flex-col justify-start items-start gap-2.5 inline-flex'>
              <div className='flex justify-between w-full'>
                <div className="text-center text-white text-base font-bold font-['Manrope']">
                  Not sure where to start?
                </div>
                <div
                  className='cursor-pointer'
                  onClick={() => {
                      closeShowup()
                  }}
                >
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    width='24'
                    height='24'
                    viewBox='0 0 24 24'
                    fill='none'
                  >
                    <path
                      d='M18 6L6 18M18 18L6 6.00001'
                      stroke='white'
                      strokeWidth='2'
                      strokeLinecap='round'
                    />
                  </svg>
                </div>
              </div>
              <div className='justify-start w-[300px] lg:w-[400px] items-center gap-2 lg:gap-[59px] cursor-pointer inline-flex'>
                {/* <div className='justify-start w-full items-center gap-2 flex'>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    width='18'
                    height='18'
                    viewBox='0 0 18 18'
                    fill='none'
                  >
                    <path
                      fillRule='evenodd'
                      clipRule='evenodd'
                      d='M6.3 3H11.7C13.3802 3 14.2202 3 14.862 3.32698C15.4265 3.6146 15.8854 4.07354 16.173 4.63803C16.5 5.27976 16.5 6.11984 16.5 7.8V10.2C16.5 11.8802 16.5 12.7202 16.173 13.362C15.8854 13.9265 15.4265 14.3854 14.862 14.673C14.2202 15 13.3802 15 11.7 15H6.3C4.61984 15 3.77976 15 3.13803 14.673C2.57354 14.3854 2.1146 13.9265 1.82698 13.362C1.5 12.7202 1.5 11.8802 1.5 10.2V7.8C1.5 6.11984 1.5 5.27976 1.82698 4.63803C2.1146 4.07354 2.57354 3.6146 3.13803 3.32698C3.77976 3 4.61984 3 6.3 3ZM7.125 11.2431V6.75686C7.125 6.13006 7.85614 5.77588 8.36115 6.15805L11.3253 8.40117C11.7249 8.70359 11.7249 9.29638 11.3253 9.5988L8.36115 11.8419C7.85614 12.2241 7.125 11.8699 7.125 11.2431Z'
                      stroke='#E1EEFF'
                      strokeLinecap='round'
                    />
                  </svg>
                  <div className="text-sky-100 text-sm font-normal font-['Manrope']">
                    Watch tutorial
                  </div>
                </div> :*/}
                <div
                  onClick={() => navigate('/dashboard/support')}
                  className='justify-start w-full items-center gap-2 flex'
                >
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    width='18'
                    height='18'
                    viewBox='0 0 18 18'
                    fill='none'
                  >
                    <path
                      d='M13.5 12H5.25C4.00736 12 3 13.0074 3 14.25V14.25M13.5 12V16.5M13.5 12C14.3284 12 15 11.3284 15 10.5V3C15 2.17157 14.3284 1.5 13.5 1.5H5.25C4.00736 1.5 3 2.50736 3 3.75V14.25M15 16.5H13.5M13.5 16.5H5.25C4.00736 16.5 3 15.4926 3 14.25V14.25'
                      stroke='#E1EEFF'
                      strokeLinecap='round'
                    />
                  </svg>
                  <div className="text-sky-100 text-sm font-normal font-['Manrope']">
                    Read FAQ
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : ''}
        <Card className=' w-full h-[315px] relative bg-cyan-50 rounded'>
          <div className='cursor-pointer justify-end items-center inline-flex'>
            <Button
              onClick={() => navigate('/dashboard/transactions')}
              variant='light'
              endContent={<ChevronRight className='w-4 h-4' />}
              className="text-black hover:bg-cyan-50 text-sm font-medium font-['Manrope']"
            >
              View more
            </Button>
          </div>
          <div className='h[121px] left[281px] py-16 top[97px] absolut flex-col justify-start items-center gap-[18px] inline-flex'>
            <div className='flex-col justify-start items-center gap-3 flex'>
              <div className="text-center text-black text-sm font-medium font-['Manrope']">
                Wallet balance:
              </div>
              <div className="text-center text-black text-[40px] font-normal font-['Manrope']">
                <span>{showBalance?.currency_symbol}</span>
                {showBalance?.balance?.toLocaleString()}
              </div>
            </div>
            <div className='pb-4 justify-start items-start gap-[19px] z-10 inline-flex'>
              <Button
                onClick={onOpen}
                // onClick={() => navigate(`/dashboard/home/fund`)}
                startContent={
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    width='18'
                    height='18'
                    viewBox='0 0 18 18'
                    fill='none'
                  >
                    <path
                      d='M9 3V15M15 9L3 9'
                      stroke='black'
                      strokeLinecap='round'
                    />
                  </svg>
                }
                variant='light'
                className="grow rounded-none w-[120px] shrink basis-0 h-[34px] p-2 bg-white border border-black justify-center items-center gap-1 flex text-center text-black text-[12.83px] font-bold font-['Manrope']"
              >
                Fund
              </Button>

              <Button
                onClick={() => onOpenWithdraw()}
                startContent={
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    width='19'
                    height='18'
                    viewBox='0 0 19 18'
                    fill='none'
                  >
                    <path
                      d='M15.75 6C15.75 6.27614 15.9739 6.5 16.25 6.5C16.5261 6.5 16.75 6.27614 16.75 6H15.75ZM12.5 1.75C12.2239 1.75 12 1.97386 12 2.25C12 2.52614 12.2239 2.75 12.5 2.75V1.75ZM9.14645 8.64645C8.95118 8.84171 8.95118 9.15829 9.14645 9.35355C9.34171 9.54882 9.65829 9.54882 9.85355 9.35355L9.14645 8.64645ZM16.2091 2.45475L15.7636 2.68174L15.7636 2.68175L16.2091 2.45475ZM16.0452 2.29087L15.8183 2.73638V2.73638L16.0452 2.29087ZM9.5 4.25C9.77614 4.25 10 4.02614 10 3.75C10 3.47386 9.77614 3.25 9.5 3.25V4.25ZM15.25 9C15.25 8.72386 15.0261 8.5 14.75 8.5C14.4739 8.5 14.25 8.72386 14.25 9H15.25ZM4.38803 15.423L4.61502 14.9775L4.38803 15.423ZM3.07698 14.112L2.63148 14.339L3.07698 14.112ZM13.112 15.423L12.885 14.9775L13.112 15.423ZM14.423 14.112L13.9775 13.885L14.423 14.112ZM3.07698 5.38803L2.63148 5.16103H2.63148L3.07698 5.38803ZM4.38803 4.07698L4.16103 3.63148L4.38803 4.07698ZM16.75 6V2.85H15.75V6H16.75ZM15.65 1.75H12.5V2.75H15.65V1.75ZM15.7866 2.00628L9.14645 8.64645L9.85355 9.35355L16.4937 2.71339L15.7866 2.00628ZM16.75 2.85C16.75 2.75324 16.7504 2.6506 16.7432 2.56298C16.7356 2.46953 16.717 2.3501 16.6546 2.22776L15.7636 2.68175C15.7422 2.63962 15.744 2.61281 15.7466 2.64442C15.7478 2.65992 15.7489 2.68287 15.7494 2.71878C15.75 2.75468 15.75 2.79635 15.75 2.85H16.75ZM15.65 2.75C15.7036 2.75 15.7453 2.75001 15.7812 2.75058C15.8171 2.75114 15.8401 2.75218 15.8556 2.75345C15.8872 2.75603 15.8604 2.75784 15.8183 2.73638L16.2722 1.84537C16.1499 1.78303 16.0305 1.76441 15.937 1.75677C15.8494 1.74961 15.7468 1.75 15.65 1.75V2.75ZM16.6546 2.22776C16.6127 2.14544 16.5582 2.07081 16.4937 2.00628L15.7866 2.71339C15.7774 2.70418 15.7696 2.69351 15.7636 2.68174L16.6546 2.22776ZM16.4937 2.00628C16.4292 1.94176 16.3546 1.88731 16.2722 1.84537L15.8183 2.73638C15.8065 2.73038 15.7958 2.7226 15.7866 2.71339L16.4937 2.00628ZM9.95 15.25H7.55V16.25H9.95V15.25ZM3.25 10.95V8.55H2.25V10.95H3.25ZM7.55 4.25H9.5V3.25H7.55V4.25ZM14.25 9V10.95H15.25V9H14.25ZM7.55 15.25C6.70167 15.25 6.09549 15.2496 5.62032 15.2108C5.15099 15.1724 4.85366 15.0991 4.61502 14.9775L4.16103 15.8685C4.56413 16.0739 5.00771 16.1641 5.53889 16.2075C6.06423 16.2504 6.71817 16.25 7.55 16.25V15.25ZM2.25 10.95C2.25 11.7818 2.24961 12.4358 2.29253 12.9611C2.33593 13.4923 2.42609 13.9359 2.63148 14.339L3.52248 13.885C3.40089 13.6463 3.32756 13.349 3.28921 12.8797C3.25039 12.4045 3.25 11.7983 3.25 10.95H2.25ZM4.61502 14.9775C4.14462 14.7378 3.76217 14.3554 3.52248 13.885L2.63148 14.339C2.96703 14.9975 3.50247 15.533 4.16103 15.8685L4.61502 14.9775ZM9.95 16.25C10.7818 16.25 11.4358 16.2504 11.9611 16.2075C12.4923 16.1641 12.9359 16.0739 13.339 15.8685L12.885 14.9775C12.6463 15.0991 12.349 15.1724 11.8797 15.2108C11.4045 15.2496 10.7983 15.25 9.95 15.25V16.25ZM14.25 10.95C14.25 11.7983 14.2496 12.4045 14.2108 12.8797C14.1724 13.349 14.0991 13.6463 13.9775 13.885L14.8685 14.339C15.0739 13.9359 15.1641 13.4923 15.2075 12.9611C15.2504 12.4358 15.25 11.7818 15.25 10.95H14.25ZM13.339 15.8685C13.9975 15.533 14.533 14.9975 14.8685 14.339L13.9775 13.885C13.7378 14.3554 13.3554 14.7378 12.885 14.9775L13.339 15.8685ZM3.25 8.55C3.25 7.70167 3.25039 7.09549 3.28921 6.62032C3.32756 6.15099 3.40089 5.85366 3.52248 5.61502L2.63148 5.16103C2.42609 5.56414 2.33593 6.00771 2.29253 6.53889C2.24961 7.06423 2.25 7.71817 2.25 8.55H3.25ZM7.55 3.25C6.71817 3.25 6.06423 3.24961 5.53889 3.29253C5.00771 3.33593 4.56413 3.42609 4.16103 3.63148L4.61502 4.52248C4.85366 4.40089 5.15099 4.32756 5.62032 4.28921C6.09549 4.25039 6.70167 4.25 7.55 4.25V3.25ZM3.52248 5.61502C3.76217 5.14462 4.14462 4.76217 4.61502 4.52248L4.16103 3.63148C3.50247 3.96703 2.96703 4.50247 2.63148 5.16103L3.52248 5.61502Z'
                      fill='black'
                    />
                  </svg>
                }
                variant='light'
                className="text-center rounded-none w-[120px] grow shrink basis-0 h-[34px] p-2 bg-white border border-black justify-center items-center gap-1 flex text-black text-[12.83px] font-bold font-['Manrope']"
              >
                Withdraw
              </Button>
            </div>
            <div className='absolute z-0 right-0'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                width='239'
                height='208'
                viewBox='0 0 239 208'
                fill='none'
              >
                <path
                  fillRule='evenodd'
                  clipRule='evenodd'
                  d='M170.228 520.387C125.309 481.859 87.9365 432.934 58.111 373.612C28.2543 314.311 10.0428 252.683 3.47662 188.727C-3.08954 124.77 0.513916 61.8615 14.287 -1.3995e-06L113.577 63.6006C108.769 95.5506 107.603 127.482 110.081 159.395C112.559 191.307 119.072 222.942 129.619 254.299L262.673 89.2795L317.965 124.527L316.901 197.137L183.847 362.156C202.222 388.323 222.823 410.617 245.652 429.038C268.48 447.458 293.144 462.265 319.644 473.458L317.964 604C264.393 586.787 215.147 558.916 170.228 520.387Z'
                  fill='#190B19'
                  fillOpacity='0.1'
                />
              </svg>
            </div>
          </div>
        </Card>

        <div className='justify-start items-start grid grid-cols-2 gap-4 inlineflex'>
          <div
            onClick={() => navigate(`/dashboard/advertise`)}
            className='h-full'
          >
            <Card className=' bg-green-50 cursor-pointer h-60 rounded px-4'>
              <div className='inline-flex items-center justify-end'>
                <Button
                  variant='light'
                  isIconOnly
                  endContent={<FaArrowRightLong />}
                  className='text-black lg:mb-8 hover:bg-green-50 text-sm font-medium font-Manrope'
                />
              </div>
              <div className=' grid items-center mt-2  md:mt-10 md:gap-4 md:grid-cols-2  '>
                <div className=' flex-col justify-start items-start gap-3 inline-flex'>
                  <div className='text-black text-md font-bold font-Manrope'>
                    Create an advert
                  </div>
                  <div className=' text-stone-900 text-xs font-normal font-Manrope md:text-sm'>
                    Get real people to post your ads on their social media
                    account.
                  </div>
                </div>
                <div
                  className={`w-20 absolute bottom-2 right-0 md:relative md:top-0 ${
                    !isTablet ? '' : ''
                  } md:w-full md:inline-flex`}
                  // className={`w-20 relative  ${
                  //   !onNotificationClick ? 'right-0' : ' -right-24'
                  // } md:w-full md:inline-flex`}
                >
                  <Image src={selfieImage} />
                </div>
              </div>
            </Card>
          </div>
          <div onClick={() => navigate(`/dashboard/earn`)} className='h-full'>
            <Card className='h-60 bg-rose-50 cursor-pointer rounded px-4'>
              <div className='inline-flex  items-center justify-end'>
                <Button
                  variant='light'
                  isIconOnly
                  endContent={<FaArrowRightLong />}
                  className='text-black lg:mb-5 hover:bg-green-50 text-sm font-medium font-Manrope'
                />
              </div>
              <div className=' grid items-center mt-2  md:mt-10 md:gap-4 md:grid-cols-2  '>
                <div className=' flex-col justify-start items-start gap-3 inline-flex'>
                  <div className='text-black text-md font-bold font-Manrope'>
                    Engage a task
                  </div>
                  <div className=' text-stone-900 text-xs font-normal font-Manrope md:text-sm'>
                    Monetize Your Influence! Earn by Posting Ads on Your Social
                    Media.
                  </div>
                </div>
                <div
                  className={` w-20 relative bottom-0 mt-12 md:mt-0 -right-16 lg:-right-18 md:right-0 md:relative md:top-0${
                    !isTablet ? '' : ' '
                  } md:w-full md:inline-flex`}
                  // className={`w-20 relative  ${
                  //   !onNotificationClick ? 'right-0' : ' -right-24'
                  // } md:w-full md:inline-flex`}
                >
                  <Image src={readingImage} />
                </div>
              </div>
            </Card>
          </div>
        </div>
        <div className='self-stretch  flex-col justify-start items-start gap-3 flex'>
          <div className='self-stretch py-3 justify-start items-start gap-2 inline-flex'>
            <div className="text-white text-2xl font-medium font-['Manrope']"> 
              What’s Up
            </div>
          </div>
          <div className='self-stretch flex-col justify-start items-start gap-3 flex'>
            {!userDetails?.firstname &&
              !userDetails?.lastname &&
              !userDetails?.gender &&
              !userDetails?.country &&
              !userDetails?.profile_picture &&
              profile && (
                <Card className='self-stretch p-6 bg-gray-300 dark:bg-[#171717] justify-start items-start gap-[29px] inline-flex'>
                  <div className='grow shrink basis-0 flex-col justify-start items-start gap-2.5 inline-flex'>
                    <div className="text-center text-black dark:text-white text-base font-bold font-['Manrope']">
                      Complete your profile set up
                    </div>
                    <div className="self-stretch text-black dark:text-zinc-300 text-xs font-normal font-['Manrope']">
                      To personalize your experience and let you take full
                      advantage of everything we offer, we encourage you to
                      complete your profile settings. A well-rounded profile
                      lets you showcase your expertise, interests, and goals. 
                    </div>
                    <Button
                      startContent={
                        <svg
                          xmlns='http://www.w3.org/2000/svg'
                          width='20'
                          height='20'
                          viewBox='0 0 20 20'
                          fill='none'
                        >
                          <path
                            d='M3.33331 4.16667H13.3333M13.3333 4.16667C13.3333 5.08714 14.0795 5.83333 15 5.83333C15.9205 5.83333 16.6666 5.08714 16.6666 4.16667C16.6666 3.24619 15.9205 2.5 15 2.5C14.0795 2.5 13.3333 3.24619 13.3333 4.16667ZM6.66665 10H16.6666M6.66665 10C6.66665 10.9205 5.92045 11.6667 4.99998 11.6667C4.07951 11.6667 3.33331 10.9205 3.33331 10C3.33331 9.07953 4.07951 8.33333 4.99998 8.33333C5.92045 8.33333 6.66665 9.07953 6.66665 10ZM3.33331 15.8333H13.3333M13.3333 15.8333C13.3333 16.7538 14.0795 17.5 15 17.5C15.9205 17.5 16.6666 16.7538 16.6666 15.8333C16.6666 14.9129 15.9205 14.1667 15 14.1667C14.0795 14.1667 13.3333 14.9129 13.3333 15.8333Z'
                            // stroke='#FFD0FE'
                            className='text-[#FFD0FE] stroke-[#CB29BE] dark:stroke-[#FFD0FE]'
                            strokeWidth='2'
                            strokeLinecap='round'
                          />
                        </svg>
                      }
                      className='p-2 rounded-none bg-white dark:bg-opacity-10 border border-violet-500 border-opacity-25 justify-center items-center gap-1 inline-flex'
                    >
                      <div
                        onClick={() => navigate(`/dashboard/settings`)}
                        className="text-center text-black dark:text-white text-[12.83px] font-bold font-['Manrope']"
                      >
                        Go to settings
                      </div>
                    </Button>
                  </div>
                  <div
                    onClick={() => setProfile(false)}
                    className='absolute right-10 cursor-pointer'
                  >
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      width='24'
                      height='24'
                      viewBox='0 0 24 24'
                      fill='none'
                    >
                      <path
                        d='M18 6L6 18M18 18L6 6.00001'
                        stroke='white'
                        strokeWidth='2'
                        strokeLinecap='round'
                      />
                    </svg>
                  </div>
                </Card>
              )}
            {
              userDetails?.social_profiles[0]?.status  === 'verified' &&
              userDetails?.social_profiles[1]?.status  === 'verified' &&
              userDetails?.social_profiles[2]?.status  === 'verified' &&
              userDetails?.social_profiles[3]?.status === 'verified' &&
              userDetails?.social_profiles[4]?.status === 'verified' ? '' :            
              // (linkIg ? (
                <Card className='self-stretch p-6 bg-gray-300 dark:bg-[#171717] justify-start items-start gap-[29px] inline-flex'>
                  <div className='grow shrink basis-0 flex-col justify-start items-start gap-2.5 inline-flex'>
                    <div className="text-center text-black dark:text-white text-base font-bold font-['Manrope']">
                        Link your Social Media Account
                    </div>
                    <div className="self-stretch text-black dark:text-zinc-300 w-10/12 text-xs font-normal font-['Manrope']">
                        You need to link your social media accounts to Trendit³ before you can start earning. Click the button below to link your social  media accounts now.
                    </div>
                    <Button
                      onClick={handOpenSocialModal}
                      className='p-2 rounded-none bg-white dark:bg-opacity-10 border border-violet-500 border-opacity-25 justify-center items-center gap-1 inline-flex'
                    >
                      <div className="text-center text-black dark:text-white text-[12.83px] font-bold font-['Manrope']">
                          Link Your Account
                      </div>
                    </Button>
                  </div>
                  <div
                    onClick={() => setLinkIg(false)}
                    className='absolute right-10 cursor-pointer'
                  >
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      width='24'
                      height='24'
                      viewBox='0 0 24 24'
                      fill='none'
                    >
                      <path
                        d='M18 6L6 18M18 18L6 6.00001'
                        stroke='white'
                        strokeWidth='2'
                        strokeLinecap='round'
                      />
                    </svg>
                  </div>
                </Card>
              // ) : null)
              }
          </div>
        </div>
        {
          performed_tasks?.length >= 1 ?
          <div className='bg-[#3793FF] py-4 px-4 flex flex-col gap-y-4'>
            <div className='flex items-center justify-between'>
              <p className='font-[700] text-[16px]'>
                Complete your pending Task 
              </p>
            </div>
              <div>
                This is to remind you to ensure timely completion of your current task  before the time frame given for the task elapse and only completion of a task guarantee payment. To complete your pending task click on the button below.
              </div>
              <div onClick={() => navigate('/dashboard/earn-history')} className='flex items-center bg-white w-[131px] h-[36px] p-[8px] gap-x-2 text-black font-[700] text-[12px]'>
                 <Icons type='complete-task' />
                 Complete Task
              </div>
          </div> : ''
        }
        

        <div className='mx-auto text-center md:mt-40 h-20 pb-3 flex-col justify-start items-center inline-flex'>
          <div className='self-stretch px-6 justify-center items-start gap-6 inline-flex'>
            <div className='py-3 justify-start items-center gap-[7px] flex'>
              <div className="text-center text-black dark:text-zinc-300 text-sm font-medium font-['Manrope']">
                <a
                  href='https://trendit3.com'
                  target='_blank'
                  rel='noreferrer'
                >
                  {' '}
                  About Us{' '}
                </a>
              </div>
            </div>
            <div className='py-3 justify-start items-center gap-[7px] flex'>
              <div
                href='https://trendit3.com/privacy-policy'
                target='_blank'
                rel='noreferrer'
                className="text-center text-black dark:text-zinc-300 text-sm font-medium font-['Manrope']"
                // onClick={() => navigate('terms')}
              >
                <a
                  href='https://trendit3.com/privacy-policy'
                  target='_blank'
                  rel='noreferrer'
                >
                  Terms
                </a>
              </div>
            </div>
            <div className='py-3 justify-start items-center gap-[7px] flex'>
              <div className="text-center text-black dark:text-zinc-300 text-sm font-medium font-['Manrope']">
                <a
                  href='https://trendit3.com/privacy-policy'
                  target='_blank'
                  rel='noreferrer'
                >
                  Privacy policy
                </a>
              </div>
            </div>
          </div>
          <div className='py-3 justify-start items-center gap-[7px] inline-flex'>
            <div className="text-center text-black dark:text-zinc-300 text-sm font-medium font-['Manrope']">
              © {new Date().getFullYear()} TRENDIT MEDIA LTD.
            </div>
          </div>
        </div>
      </div>

      {/* {isOpen && <SelectPaymentmodal isOpen={isOpen} onClose={onClose} />} */}
      {isOpen && <FundWalletModal isOpen={isOpen} onClose={onClose} />}
      {openWithdraw && (
        <VatModal isOpen={openWithdraw} onClose={onCloseWithdraw} />
      )}
      {isOpenVerify && (
        <SocialLinkOption isOpen={isOpenVerify}
        onClose={onCloseVerify}/>       
      )}
    </div>
     : <div>
      <Loader />
     </div> }
    </>
  )
}

