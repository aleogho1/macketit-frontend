/* eslint-disable react/no-unescaped-entities */
/* eslint-disable no-unsafe-optional-chaining */
/* eslint-disable no-irregular-whitespace */

import { useNavigate } from 'react-router-dom'
import frameImageLight from '../../../../assets/engageIcon237873.svg'
import { useState, useContext, useEffect } from 'react'
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
import { format } from 'date-fns'

export default function GenerateThrTask() {
  const [selected, setSelected] = useState()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const {
    isOpen: isOpenVerify,
    onOpen: onOpenVerify,
    onClose: onCloseVerify,
  } = useDisclosure()
  const { data: fetchTask } = usePerformTask(selected, 'threads')
  const { isDarkMode } = useDarkMode()
  const frameImage = isDarkMode ? frameImageDark : frameImageLight
  const navigate = useNavigate()
  const { data: profileDeatils } = useGetProfile()
  const [active, setActive] = useState()
  const socialAccount = useContext(SocialAccountContext)

  const getSocial = () => {
    if (socialAccount) {
      for (const item of socialAccount) {
        item?.platform === 'threads' ? setActive(item) : ''
      }
    } else {
      for (const item of profileDeatils?.social_profiles) {
        item?.platform === 'threads' ? setActive(item) : ''
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
  const { data: advertTask } = useGetAdvertTask('Threads')

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
                  height='48'
                  viewBox='0 0 47 48'
                  fill='none'
                >
                  <path
                    d='M27.4166 24.6967C27.3736 25.5192 27.1875 26.328 26.8683 27.0859C26.6071 27.6634 26.1769 28.1482 25.6346 28.4763C25.2703 28.6721 24.8708 28.7994 24.4596 28.8484C23.8648 28.9661 23.2527 28.9661 22.6579 28.8484C22.2676 28.7446 21.9016 28.5649 21.5808 28.3196C21.3864 28.1483 21.228 27.9401 21.1147 27.707C21.0015 27.4739 20.9356 27.2207 20.9211 26.962C20.9065 26.7033 20.9435 26.4442 21.0298 26.1999C21.1162 25.9556 21.2502 25.7309 21.4241 25.5388C21.7887 25.18 22.2412 24.9234 22.7362 24.7946C23.2689 24.6282 23.8231 24.5498 24.3812 24.5596C24.8904 24.5303 25.3996 24.5303 25.9087 24.5596C26.3826 24.5968 26.8526 24.6615 27.3187 24.7555L27.4166 24.6967Z'
                    className='dark:fill-black fill-white'
                  />
                  <path
                    d='M33.2917 4.50635H13.7084C11.1114 4.50635 8.62089 5.53797 6.7846 7.37426C4.94831 9.21055 3.91669 11.7011 3.91669 14.298V33.8813C3.91669 36.4783 4.94831 38.9688 6.7846 40.8051C8.62089 42.6414 11.1114 43.673 13.7084 43.673H33.2917C35.8886 43.673 38.3791 42.6414 40.2154 40.8051C42.0517 38.9688 43.0834 36.4783 43.0834 33.8813V14.298C43.0834 11.7011 42.0517 9.21055 40.2154 7.37426C38.3791 5.53797 35.8886 4.50635 33.2917 4.50635ZM14.7267 29.0443C15.0354 30.0748 15.5117 31.0474 16.1367 31.923C17.0288 33.1553 18.2605 34.1012 19.6813 34.6451C20.5566 34.9702 21.4731 35.1817 22.4034 35.2718C23.3159 35.3599 24.2324 35.3599 25.145 35.2718C26.2096 35.1901 27.251 34.9181 28.2196 34.4688C29.3158 33.9355 30.2541 33.1255 30.9417 32.1188C31.3553 31.5278 31.6285 30.85 31.7405 30.1374C31.8525 29.4247 31.8003 28.6958 31.5879 28.0063C31.3293 27.1345 30.7755 26.3798 30.0213 25.8718L29.6296 25.5976C29.6296 25.7738 29.6296 25.9305 29.5317 26.0872C29.3946 26.9684 29.1009 27.8144 28.67 28.5938C28.2888 29.2921 27.7508 29.8925 27.0984 30.3478C26.446 30.8031 25.6969 31.101 24.91 31.218C23.8749 31.4207 22.8058 31.3669 21.7963 31.0613C20.9588 30.8303 20.196 30.3848 19.5834 29.7688C18.9118 29.0855 18.4908 28.1953 18.3888 27.2426C18.2907 26.4364 18.4225 25.6188 18.769 24.8842C19.1155 24.1497 19.6625 23.528 20.3471 23.0909C21.059 22.6184 21.8579 22.2922 22.6971 22.1313C23.5255 21.9943 24.3636 21.9355 25.2038 21.9551C25.8596 21.9724 26.5137 22.0312 27.1621 22.1313H27.2796C27.1925 21.5956 27.0136 21.0788 26.7509 20.6038C26.5612 20.2871 26.3087 20.0125 26.009 19.797C25.7092 19.5814 25.3686 19.4295 25.0079 19.3505C24.1465 19.0861 23.2256 19.0861 22.3642 19.3505C21.7434 19.5701 21.2039 19.973 20.8171 20.5059V20.643L18.8588 19.2918V19.1547C19.6748 17.9718 20.917 17.1507 22.325 16.8634C23.5259 16.6016 24.7741 16.6556 25.9479 17.0201C26.6061 17.2216 27.2154 17.557 27.7378 18.0052C28.2602 18.4534 28.6842 19.0048 28.9834 19.6247C29.328 20.3277 29.5611 21.0817 29.6688 21.8572C29.726 22.1938 29.7587 22.5341 29.7667 22.8755L30.3542 23.1497C31.2727 23.6374 32.0849 24.3031 32.7434 25.108C33.4209 25.9442 33.8655 26.943 34.0359 28.0063C34.1749 28.6487 34.2219 29.3086 34.1729 29.9647C34.0728 31.5951 33.4319 33.1456 32.3517 34.3709C30.9863 35.9852 29.1287 37.1067 27.0642 37.563C26.1551 37.7534 25.2312 37.8648 24.3029 37.8959C23.4596 37.9314 22.6148 37.8987 21.7767 37.798C20.4173 37.6386 19.0938 37.2548 17.86 36.6622C16.2702 35.8566 14.9197 34.6478 13.9434 33.1568C13.2204 32.0318 12.6724 30.8037 12.3179 29.5143C12.0555 28.5449 11.8656 27.5559 11.75 26.5572V24.0897C11.75 23.2672 11.75 22.4447 11.8871 21.6222C11.9677 20.6918 12.1182 19.7687 12.3375 18.8609C12.6366 17.7173 13.0983 16.6226 13.7084 15.6101C14.9316 13.4275 16.9308 11.7848 19.3092 11.008C20.1626 10.7183 21.0411 10.5085 21.9334 10.3813C23.0525 10.2541 24.1825 10.2541 25.3017 10.3813C26.6541 10.5047 27.9772 10.8487 29.2184 11.3997C31.0096 12.1898 32.5333 13.4822 33.605 15.1205C34.3566 16.303 34.9121 17.5991 35.25 18.9588L32.9392 19.5855V19.4288C32.6792 18.5012 32.2972 17.6122 31.8034 16.7851C30.7992 15.1538 29.2424 13.9376 27.4167 13.358C26.4555 13.0319 25.4537 12.8407 24.44 12.7901C23.6905 12.7311 22.9375 12.7311 22.1879 12.7901C21.0312 12.9034 19.9039 13.2217 18.8588 13.7301C17.508 14.4355 16.397 15.526 15.6667 16.8634C15.1611 17.7796 14.7854 18.7616 14.5504 19.7813C14.3437 20.6106 14.2062 21.4556 14.1392 22.3076C14.09 23.1228 14.09 23.9403 14.1392 24.7555C14.1486 26.2045 14.3461 27.6461 14.7267 29.0443Z'
                    className='dark:fill-black fill-white'
                  />
                  <path
                    d='M27.4166 24.6967C27.3736 25.5192 27.1875 26.328 26.8683 27.0859C26.6071 27.6634 26.1769 28.1482 25.6346 28.4763C25.2703 28.6721 24.8708 28.7994 24.4596 28.8484C23.8648 28.9661 23.2527 28.9661 22.6579 28.8484C22.2676 28.7446 21.9016 28.5649 21.5808 28.3196C21.3864 28.1483 21.228 27.9401 21.1147 27.707C21.0015 27.4739 20.9356 27.2207 20.9211 26.962C20.9065 26.7033 20.9435 26.4442 21.0298 26.1999C21.1162 25.9556 21.2502 25.7309 21.4241 25.5388C21.7887 25.18 22.2412 24.9234 22.7362 24.7946C23.2689 24.6282 23.8231 24.5498 24.3812 24.5596C24.8904 24.5303 25.3996 24.5303 25.9087 24.5596C26.3826 24.5968 26.8526 24.6615 27.3187 24.7555L27.4166 24.6967Z'
                    className='dark:fill-black fill-white'
                  />
                </svg>
              </div>
              <div className='justify-center items-start gap-2 inline-flex'>
                <div className='max-w-[484px] flex-col justify-start items-center gap-3 inline-flex'>
                  <div className="text-white dark:text-black text-sm font-medium text-center  font-['Manrope']">
                    Post adverts on Thread
                  </div>
                  <div className="self-stretch dark:text-black text-center text-white w-11/12 m-auto text-xs font-normal font-['Manrope']">
                    Promote advertisements for different businesses and top
                    brands on your Threads page and earn ₦110 for each post. The
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
            {active?.status === 'verified' ? (
              <div className='w-full pl-4 md:pl-8 mt-6 flex flex-col gap-y-2'>
                <h2 className='text-zinc-700 dark:text-white font-bold text-[16px]'>
                  Your Threads Profile Account
                </h2>
                {active?.status === 'verified' ? (
                  <p className='text-blue-300 dark:text-white font-semibold text-[12px] w-11/12'>
                    Your Threads task must be done from the below Threads
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
                  Link your Thread Account
                </div>
                <div className="self-stretch dark:text-gray-400 text-primaryText text-xs font-normal font-['Manrope']">
                  You need to link your Thread Accounts to MacketIT before you
                  can start earning with your Thread Accounts . Click the button
                  below to link your Thread Accounts now.
                </div>
                <div
                  onClick={handOpenSocialModal}
                  className='p-2 dark:bg-stone-900 cursor-pointer bg-white border border-violet-500 border-opacity-25 justify-center items-center gap-1 inline-flex'
                >
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    width='25'
                    height='24'
                    viewBox='0 0 47 48'
                    fill='none'
                  >
                    <path
                      d='M27.4166 24.6967C27.3736 25.5192 27.1875 26.328 26.8683 27.0859C26.6071 27.6634 26.1769 28.1482 25.6346 28.4763C25.2703 28.6721 24.8708 28.7994 24.4596 28.8484C23.8648 28.9661 23.2527 28.9661 22.6579 28.8484C22.2676 28.7446 21.9016 28.5649 21.5808 28.3196C21.3864 28.1483 21.228 27.9401 21.1147 27.707C21.0015 27.4739 20.9356 27.2207 20.9211 26.962C20.9065 26.7033 20.9435 26.4442 21.0298 26.1999C21.1162 25.9556 21.2502 25.7309 21.4241 25.5388C21.7887 25.18 22.2412 24.9234 22.7362 24.7946C23.2689 24.6282 23.8231 24.5498 24.3812 24.5596C24.8904 24.5303 25.3996 24.5303 25.9087 24.5596C26.3826 24.5968 26.8526 24.6615 27.3187 24.7555L27.4166 24.6967Z'
                      className='dark:fill-white fill-black'
                    />
                    <path
                      d='M33.2917 4.50635H13.7084C11.1114 4.50635 8.62089 5.53797 6.7846 7.37426C4.94831 9.21055 3.91669 11.7011 3.91669 14.298V33.8813C3.91669 36.4783 4.94831 38.9688 6.7846 40.8051C8.62089 42.6414 11.1114 43.673 13.7084 43.673H33.2917C35.8886 43.673 38.3791 42.6414 40.2154 40.8051C42.0517 38.9688 43.0834 36.4783 43.0834 33.8813V14.298C43.0834 11.7011 42.0517 9.21055 40.2154 7.37426C38.3791 5.53797 35.8886 4.50635 33.2917 4.50635ZM14.7267 29.0443C15.0354 30.0748 15.5117 31.0474 16.1367 31.923C17.0288 33.1553 18.2605 34.1012 19.6813 34.6451C20.5566 34.9702 21.4731 35.1817 22.4034 35.2718C23.3159 35.3599 24.2324 35.3599 25.145 35.2718C26.2096 35.1901 27.251 34.9181 28.2196 34.4688C29.3158 33.9355 30.2541 33.1255 30.9417 32.1188C31.3553 31.5278 31.6285 30.85 31.7405 30.1374C31.8525 29.4247 31.8003 28.6958 31.5879 28.0063C31.3293 27.1345 30.7755 26.3798 30.0213 25.8718L29.6296 25.5976C29.6296 25.7738 29.6296 25.9305 29.5317 26.0872C29.3946 26.9684 29.1009 27.8144 28.67 28.5938C28.2888 29.2921 27.7508 29.8925 27.0984 30.3478C26.446 30.8031 25.6969 31.101 24.91 31.218C23.8749 31.4207 22.8058 31.3669 21.7963 31.0613C20.9588 30.8303 20.196 30.3848 19.5834 29.7688C18.9118 29.0855 18.4908 28.1953 18.3888 27.2426C18.2907 26.4364 18.4225 25.6188 18.769 24.8842C19.1155 24.1497 19.6625 23.528 20.3471 23.0909C21.059 22.6184 21.8579 22.2922 22.6971 22.1313C23.5255 21.9943 24.3636 21.9355 25.2038 21.9551C25.8596 21.9724 26.5137 22.0312 27.1621 22.1313H27.2796C27.1925 21.5956 27.0136 21.0788 26.7509 20.6038C26.5612 20.2871 26.3087 20.0125 26.009 19.797C25.7092 19.5814 25.3686 19.4295 25.0079 19.3505C24.1465 19.0861 23.2256 19.0861 22.3642 19.3505C21.7434 19.5701 21.2039 19.973 20.8171 20.5059V20.643L18.8588 19.2918V19.1547C19.6748 17.9718 20.917 17.1507 22.325 16.8634C23.5259 16.6016 24.7741 16.6556 25.9479 17.0201C26.6061 17.2216 27.2154 17.557 27.7378 18.0052C28.2602 18.4534 28.6842 19.0048 28.9834 19.6247C29.328 20.3277 29.5611 21.0817 29.6688 21.8572C29.726 22.1938 29.7587 22.5341 29.7667 22.8755L30.3542 23.1497C31.2727 23.6374 32.0849 24.3031 32.7434 25.108C33.4209 25.9442 33.8655 26.943 34.0359 28.0063C34.1749 28.6487 34.2219 29.3086 34.1729 29.9647C34.0728 31.5951 33.4319 33.1456 32.3517 34.3709C30.9863 35.9852 29.1287 37.1067 27.0642 37.563C26.1551 37.7534 25.2312 37.8648 24.3029 37.8959C23.4596 37.9314 22.6148 37.8987 21.7767 37.798C20.4173 37.6386 19.0938 37.2548 17.86 36.6622C16.2702 35.8566 14.9197 34.6478 13.9434 33.1568C13.2204 32.0318 12.6724 30.8037 12.3179 29.5143C12.0555 28.5449 11.8656 27.5559 11.75 26.5572V24.0897C11.75 23.2672 11.75 22.4447 11.8871 21.6222C11.9677 20.6918 12.1182 19.7687 12.3375 18.8609C12.6366 17.7173 13.0983 16.6226 13.7084 15.6101C14.9316 13.4275 16.9308 11.7848 19.3092 11.008C20.1626 10.7183 21.0411 10.5085 21.9334 10.3813C23.0525 10.2541 24.1825 10.2541 25.3017 10.3813C26.6541 10.5047 27.9772 10.8487 29.2184 11.3997C31.0096 12.1898 32.5333 13.4822 33.605 15.1205C34.3566 16.303 34.9121 17.5991 35.25 18.9588L32.9392 19.5855V19.4288C32.6792 18.5012 32.2972 17.6122 31.8034 16.7851C30.7992 15.1538 29.2424 13.9376 27.4167 13.358C26.4555 13.0319 25.4537 12.8407 24.44 12.7901C23.6905 12.7311 22.9375 12.7311 22.1879 12.7901C21.0312 12.9034 19.9039 13.2217 18.8588 13.7301C17.508 14.4355 16.397 15.526 15.6667 16.8634C15.1611 17.7796 14.7854 18.7616 14.5504 19.7813C14.3437 20.6106 14.2062 21.4556 14.1392 22.3076C14.09 23.1228 14.09 23.9403 14.1392 24.7555C14.1486 26.2045 14.3461 27.6461 14.7267 29.0443Z'
                      className='dark:fill-white fill-black'
                    />
                    <path
                      d='M27.4166 24.6967C27.3736 25.5192 27.1875 26.328 26.8683 27.0859C26.6071 27.6634 26.1769 28.1482 25.6346 28.4763C25.2703 28.6721 24.8708 28.7994 24.4596 28.8484C23.8648 28.9661 23.2527 28.9661 22.6579 28.8484C22.2676 28.7446 21.9016 28.5649 21.5808 28.3196C21.3864 28.1483 21.228 27.9401 21.1147 27.707C21.0015 27.4739 20.9356 27.2207 20.9211 26.962C20.9065 26.7033 20.9435 26.4442 21.0298 26.1999C21.1162 25.9556 21.2502 25.7309 21.4241 25.5388C21.7887 25.18 22.2412 24.9234 22.7362 24.7946C23.2689 24.6282 23.8231 24.5498 24.3812 24.5596C24.8904 24.5303 25.3996 24.5303 25.9087 24.5596C26.3826 24.5968 26.8526 24.6615 27.3187 24.7555L27.4166 24.6967Z'
                      className='dark:fill-white fill-black'
                    />
                  </svg>
                  <div className="text-center dark:text-white text-primaryText text-[12.83px] font-bold font-['Manrope']">
                    Link Thread account
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
                    <div className='px-3 justify-start items-center gap-[11px] hidden fex'>
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
                    To receive your next Threads advert task, click the Above.
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
        platform='thread'
      />
      {isOpenVerify && (
        <SocialLinkModal
          type='Threads'
          platform='threads'
          // icon={appearance === 'dark' ? 'thread' : 'thread-lite'}
          icon={'thread-lite'}
          LogoBand={
            <svg
              xmlns='http://www.w3.org/2000/svg'
              width='25'
              height='24'
              viewBox='0 0 47 48'
              fill='none'
            >
              <path
                d='M27.4166 24.6967C27.3736 25.5192 27.1875 26.328 26.8683 27.0859C26.6071 27.6634 26.1769 28.1482 25.6346 28.4763C25.2703 28.6721 24.8708 28.7994 24.4596 28.8484C23.8648 28.9661 23.2527 28.9661 22.6579 28.8484C22.2676 28.7446 21.9016 28.5649 21.5808 28.3196C21.3864 28.1483 21.228 27.9401 21.1147 27.707C21.0015 27.4739 20.9356 27.2207 20.9211 26.962C20.9065 26.7033 20.9435 26.4442 21.0298 26.1999C21.1162 25.9556 21.2502 25.7309 21.4241 25.5388C21.7887 25.18 22.2412 24.9234 22.7362 24.7946C23.2689 24.6282 23.8231 24.5498 24.3812 24.5596C24.8904 24.5303 25.3996 24.5303 25.9087 24.5596C26.3826 24.5968 26.8526 24.6615 27.3187 24.7555L27.4166 24.6967Z'
                className='dark:fill-white fill-black'
              />
              <path
                d='M33.2917 4.50635H13.7084C11.1114 4.50635 8.62089 5.53797 6.7846 7.37426C4.94831 9.21055 3.91669 11.7011 3.91669 14.298V33.8813C3.91669 36.4783 4.94831 38.9688 6.7846 40.8051C8.62089 42.6414 11.1114 43.673 13.7084 43.673H33.2917C35.8886 43.673 38.3791 42.6414 40.2154 40.8051C42.0517 38.9688 43.0834 36.4783 43.0834 33.8813V14.298C43.0834 11.7011 42.0517 9.21055 40.2154 7.37426C38.3791 5.53797 35.8886 4.50635 33.2917 4.50635ZM14.7267 29.0443C15.0354 30.0748 15.5117 31.0474 16.1367 31.923C17.0288 33.1553 18.2605 34.1012 19.6813 34.6451C20.5566 34.9702 21.4731 35.1817 22.4034 35.2718C23.3159 35.3599 24.2324 35.3599 25.145 35.2718C26.2096 35.1901 27.251 34.9181 28.2196 34.4688C29.3158 33.9355 30.2541 33.1255 30.9417 32.1188C31.3553 31.5278 31.6285 30.85 31.7405 30.1374C31.8525 29.4247 31.8003 28.6958 31.5879 28.0063C31.3293 27.1345 30.7755 26.3798 30.0213 25.8718L29.6296 25.5976C29.6296 25.7738 29.6296 25.9305 29.5317 26.0872C29.3946 26.9684 29.1009 27.8144 28.67 28.5938C28.2888 29.2921 27.7508 29.8925 27.0984 30.3478C26.446 30.8031 25.6969 31.101 24.91 31.218C23.8749 31.4207 22.8058 31.3669 21.7963 31.0613C20.9588 30.8303 20.196 30.3848 19.5834 29.7688C18.9118 29.0855 18.4908 28.1953 18.3888 27.2426C18.2907 26.4364 18.4225 25.6188 18.769 24.8842C19.1155 24.1497 19.6625 23.528 20.3471 23.0909C21.059 22.6184 21.8579 22.2922 22.6971 22.1313C23.5255 21.9943 24.3636 21.9355 25.2038 21.9551C25.8596 21.9724 26.5137 22.0312 27.1621 22.1313H27.2796C27.1925 21.5956 27.0136 21.0788 26.7509 20.6038C26.5612 20.2871 26.3087 20.0125 26.009 19.797C25.7092 19.5814 25.3686 19.4295 25.0079 19.3505C24.1465 19.0861 23.2256 19.0861 22.3642 19.3505C21.7434 19.5701 21.2039 19.973 20.8171 20.5059V20.643L18.8588 19.2918V19.1547C19.6748 17.9718 20.917 17.1507 22.325 16.8634C23.5259 16.6016 24.7741 16.6556 25.9479 17.0201C26.6061 17.2216 27.2154 17.557 27.7378 18.0052C28.2602 18.4534 28.6842 19.0048 28.9834 19.6247C29.328 20.3277 29.5611 21.0817 29.6688 21.8572C29.726 22.1938 29.7587 22.5341 29.7667 22.8755L30.3542 23.1497C31.2727 23.6374 32.0849 24.3031 32.7434 25.108C33.4209 25.9442 33.8655 26.943 34.0359 28.0063C34.1749 28.6487 34.2219 29.3086 34.1729 29.9647C34.0728 31.5951 33.4319 33.1456 32.3517 34.3709C30.9863 35.9852 29.1287 37.1067 27.0642 37.563C26.1551 37.7534 25.2312 37.8648 24.3029 37.8959C23.4596 37.9314 22.6148 37.8987 21.7767 37.798C20.4173 37.6386 19.0938 37.2548 17.86 36.6622C16.2702 35.8566 14.9197 34.6478 13.9434 33.1568C13.2204 32.0318 12.6724 30.8037 12.3179 29.5143C12.0555 28.5449 11.8656 27.5559 11.75 26.5572V24.0897C11.75 23.2672 11.75 22.4447 11.8871 21.6222C11.9677 20.6918 12.1182 19.7687 12.3375 18.8609C12.6366 17.7173 13.0983 16.6226 13.7084 15.6101C14.9316 13.4275 16.9308 11.7848 19.3092 11.008C20.1626 10.7183 21.0411 10.5085 21.9334 10.3813C23.0525 10.2541 24.1825 10.2541 25.3017 10.3813C26.6541 10.5047 27.9772 10.8487 29.2184 11.3997C31.0096 12.1898 32.5333 13.4822 33.605 15.1205C34.3566 16.303 34.9121 17.5991 35.25 18.9588L32.9392 19.5855V19.4288C32.6792 18.5012 32.2972 17.6122 31.8034 16.7851C30.7992 15.1538 29.2424 13.9376 27.4167 13.358C26.4555 13.0319 25.4537 12.8407 24.44 12.7901C23.6905 12.7311 22.9375 12.7311 22.1879 12.7901C21.0312 12.9034 19.9039 13.2217 18.8588 13.7301C17.508 14.4355 16.397 15.526 15.6667 16.8634C15.1611 17.7796 14.7854 18.7616 14.5504 19.7813C14.3437 20.6106 14.2062 21.4556 14.1392 22.3076C14.09 23.1228 14.09 23.9403 14.1392 24.7555C14.1486 26.2045 14.3461 27.6461 14.7267 29.0443Z'
                className='dark:fill-white fill-black'
              />
              <path
                d='M27.4166 24.6967C27.3736 25.5192 27.1875 26.328 26.8683 27.0859C26.6071 27.6634 26.1769 28.1482 25.6346 28.4763C25.2703 28.6721 24.8708 28.7994 24.4596 28.8484C23.8648 28.9661 23.2527 28.9661 22.6579 28.8484C22.2676 28.7446 21.9016 28.5649 21.5808 28.3196C21.3864 28.1483 21.228 27.9401 21.1147 27.707C21.0015 27.4739 20.9356 27.2207 20.9211 26.962C20.9065 26.7033 20.9435 26.4442 21.0298 26.1999C21.1162 25.9556 21.2502 25.7309 21.4241 25.5388C21.7887 25.18 22.2412 24.9234 22.7362 24.7946C23.2689 24.6282 23.8231 24.5498 24.3812 24.5596C24.8904 24.5303 25.3996 24.5303 25.9087 24.5596C26.3826 24.5968 26.8526 24.6615 27.3187 24.7555L27.4166 24.6967Z'
                className='dark:fill-white fill-black'
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
