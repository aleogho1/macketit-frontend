/* eslint-disable no-irregular-whitespace */
import { Button, useDisclosure } from '@nextui-org/react'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import { useGetProfile } from '../../api/profileApis'
import ActivationSmallPaymentmodal2 from '../transaction/components/ActivationSmallPaymentmodal2'
import Icons from '../../components/Icon'

export default function PostAdvertTasksCard() {
  const navigate = useNavigate()
  const { data: profileDeatils } = useGetProfile()
  console.log(profileDeatils)
  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <>
      <div className='flex flex-col gap-3'>
        <div className='self-stretch lg:p-6 bg-gray-200 dark:bg-zinc-900 rounded-lg justify-start items-start gap-2 inline-flex p-2'>
          <Icons type='x' width={32} height={32} />
          <div className='grow shrink basis-0  justify-between items-start flex flex-col pb-4 gap-y-4 lg:flex-row w-11/12'>
            <div className='max-w-[484px] flex-col justify-start items-start gap-3 inline-flex lg:w-10/12'>
              <div className="text-[15px] lg:text-sm font-medium font-['Manrope']">
                Post adverts on your X account
              </div>
              <div className="self-stretch text-black dark:text-zinc-300  text-xs font-normal font-['Manrope']">
                Promote advertisements for different businesses and top brands
                on your X page and earn ₦110 for each post. The more you share,
                the more you earn. Ensure that your X account has at least 500
                active followers to qualify for this task.
              </div>
              <div className='py-1.5 justify-start items-center gap-2 inline-flex w-full'>
                <div className='justify-start items-center gap-0.5 flex'>
                  <Icons type='wallet' width={17} height={18} />
                  <div className="dark:opacity-50 text-black dark:text-zinc-400 text-sm font-medium font-['Manrope']">
                    Earning:
                  </div>
                </div>
                <div className="text-[9px] lg:text-sm font-bold font-['Manrope']">
                  ₦110 per Advert Post
                </div>
              </div>
            </div>
            <div className='cursor-pointer w-[109px] flex-col justify-start items-start inline-flex'>
              <Button
                onClick={() => {
                  if (profileDeatils?.membership_fee) {
                    navigate(`/dashboard/earn-advert_tw-task`)
                  } else {
                    onOpen()
                    toast.error('Please activate your membership')
                  }
                }}
                className='self-stretch p-2 primaryBg rounded-none rounded-t-md border border-violet-500 border-opacity-25 justify-center items-center gap-1 inline-flex'
              >
                <div className="text-center text-white text-[10px] font-medium font-['Manrope']">
                  Generate Task
                </div>
              </Button>
              {/* <div className='self-stretch p-1 bg-neutral-600 bg-opacity-10 rounded-bl-md rounded-br-md justify-center items-start gap-3 inline-flex'>
                <div className="text-center  text-[8.83px] font-normal font-['Manrope']">
                  124 Task available
                </div>
              </div> */}
            </div>
          </div>
        </div>

        <div className='self-stretch lg:p-6 bg-gray-200 dark:bg-zinc-900 rounded-lg justify-start items-start gap-2 inline-flex p-2'>
          <Icons type='instagram' width={32} height={32} />
          <div className='grow shrink basis-0 justify-between items-start flex flex-col pb-4 gap-y-4 lg:flex-row w-11/12'>
            <div className='max-w-[484px] flex-col justify-start items-start gap-3 inline-flex lg:w-10/12'>
              <div className="text-[16px] lg:text-sm font-medium font-['Manrope']">
                Post adverts on your Instagram account
              </div>
              <div className="self-stretch text-black dark:text-zinc-300  text-xs font-normal font-['Manrope']">
                Promote advertisements for different businesses and top brands
                on your Instagram page and earn ₦110 for each post. The more you
                share, the more you earn. Ensure that your Instagram account has
                at least 500 active followers to qualify for this task.
              </div>
              <div className='py-1.5 justify-start items-center gap-2 flex lg:inline-flex w-full'>
                <div className='justify-start items-center gap-0.5 flex'>
                  <Icons type='wallet' width={17} height={18} />
                  <div className="dark:opacity-50 text-black dark:text-zinc-400 text-sm font-medium font-['Manrope']">
                    Earning:
                  </div>
                </div>
                <div className="text-[9px] lg:text-sm font-bold font-['Manrope']">
                  ₦110 per Advert Post
                </div>
              </div>
            </div>
            <div className='cursor-pointer w-[109px] flex-col justify-start items-start inline-flex'>
              <Button
                onClick={() => {
                  if (profileDeatils?.membership_fee) {
                    navigate(`/dashboard/earn-advert_ig-task`)
                  } else {
                    onOpen()
                    toast.error('Please activate your membership')
                  }
                }}
                className='self-stretch p-2 primaryBg rounded-none rounded-t-md border border-violet-500 border-opacity-25 justify-center items-center gap-1 inline-flex'
              >
                <div className="text-center text-white text-[10px] font-medium font-['Manrope']">
                  Generate Task
                </div>
              </Button>
              {/* <div className='self-stretch p-1 bg-neutral-600 bg-opacity-10 rounded-bl-md rounded-br-md justify-center items-start gap-3 inline-flex'>
                <div className="text-center  text-[8.83px] font-normal font-['Manrope']">
                  124 Task available
                </div>
              </div> */}
            </div>
          </div>
        </div>
        <div className='self-stretch lg:p-6 bg-gray-200 dark:bg-zinc-900 rounded-lg justify-start items-start gap-2 inline-flex w-full p-2'>
          <Icons type='facebook' width={32} height={32} />
          <div className='grow shrink basis-0 justify-between items-start flex flex-col pb-4 gap-y-4 lg:flex-row w-11/12'>
            <div className='max-w-[484px] flex-col justify-start items-start gap-3 inline-flex lg:w-10/12'>
              <div className="  text-sm font-medium font-['Manrope']">
                Post adverts on your Facebook page
              </div>
              <div className="self-stretch text-black dark:text-zinc-300 text-xs font-normal font-['Manrope']">
                Promote advertisements for different businesses and top brands
                on your Facebook page and earn ₦110 for each post. The more you
                share, the more you earn. Ensure that your Facebook account has
                at least 500 active followers to qualify for this task.
              </div>
              <div className='py-1.5 justify-start items-center gap-2 inline-flex'>
                <div className='justify-start items-center gap-0.5 flex'>
                  <Icons type='wallet' width={18} height={18} />
                </div>
                <div className="text-[9px] lg:text-sm font-bold font-['Manrope']">
                  ₦110 per Advert Post
                </div>
              </div>
            </div>
            <div className=' cursor-pointer w-[109px] flex-col justify-start items-start inline-flex'>
              <Button
                onClick={() => {
                  if (profileDeatils?.membership_fee) {
                    navigate(`/dashboard/earn-advert_fb-task`)
                  } else {
                    onOpen()
                    toast.error('Please activate your membership')
                  }
                }}
                className='self-stretch p-2 primaryBg rounded-none rounded-t-md border border-violet-500 border-opacity-25 justify-center items-center gap-1 inline-flex'
              >
                <div className="text-center text-white text-[10px] font-medium font-['Manrope']">
                  Generate Task
                </div>
              </Button>
              {/* <div className='self-stretch p-1 bg-neutral-600 bg-opacity-10 rounded-bl-md rounded-br-md justify-center items-start gap-3 inline-flex'>
                <div className="text-center  text-[8.83px] font-normal font-['Manrope']">
                  124 Task available
                </div>
              </div> */}
            </div>
          </div>
        </div>
        <div className='self-stretch lg:p-6 bg-gray-200 dark:bg-zinc-900 rounded-lg justify-start items-start gap-2 inline-flex w-full p-2'>
          <Icons type='tik-tok' width={32} height={32} />
          <div className='grow shrink basis-0 justify-between items-start flex flex-col pb-4 gap-y-4 lg:flex-row w-11/12'>
            <div className='max-w-[484px] flex-col justify-start items-start gap-3 inline-flex lg:w-10/12'>
              <div className="text-[15px]  lg:text-sm font-medium font-['Manrope']">
                Post adverts on your TikTok page
              </div>
              <div className="self-stretch text-black dark:text-zinc-300 text-xs font-normal font-['Manrope']">
                Promote advertisements for different businesses and top brands
                on your Threads page and earn ₦110 for each post. The more you
                share, the more you earn. Ensure that your Threads account has
                at least 500 active followers to qualify for this task.
              </div>
              <div className='py-1.5 justify-start items-center gap-2 inline-flex w-full'>
                <div className='justify-start items-center gap-0.5 flex'>
                  <Icons type='wallet' width={17} height={17} />
                  <div className="dark:opacity-50 text-black dark:text-zinc-400 text-sm font-medium font-['Manrope']">
                    Earning:
                  </div>
                </div>
                <div className="text-[9px] lg:text-sm font-bold font-['Manrope']">
                  ₦110 per Advert Post
                </div>
              </div>
            </div>
            <div className=' cursor-pointer w-[109px] flex-col justify-start items-start inline-flex'>
              <Button
                onClick={() => {
                  if (profileDeatils?.membership_fee) {
                    navigate(`/dashboard/earn-advert_tiktok-task`)
                  } else {
                    onOpen()
                    toast.error('Please activate your membership')
                  }
                }}
                className='self-stretch p-2 primaryBg rounded-none rounded-t-md border border-violet-500 border-opacity-25 justify-center items-center gap-1 inline-flex'
              >
                <div className="text-center text-white text-[10px] font-medium font-['Manrope']">
                  Generate Task
                </div>
              </Button>
              {/* <div className='self-stretch p-1 bg-neutral-600 bg-opacity-10 rounded-bl-md rounded-br-md justify-center items-start gap-3 inline-flex'>
                <div className="text-center  text-[8.83px] font-normal font-['Manrope']">
                  124 Task available
                </div>
              </div> */}
            </div>
          </div>
        </div>

        <div className='self-stretch lg:p-6 bg-gray-200 dark:bg-zinc-900 rounded-lg justify-start items-start gap-2 inline-flex p-2'>
          <Icons type='whatsapp' width={32} height={32} />
          <div className='grow shrink basis-0 h[99px] justify-between items-start flex flex-col pb-4 gap-y-4 lg:flex-row w-11/12'>
            <div className='max-w-[484px] flex-col justify-start items-start gap-3 inline-flex lg:w-10/12'>
              <div className=" text-[15px] lg:text-sm font-medium font-['Manrope']">
                Post adverts on your WhatsApp status
              </div>
              <div className="self-stretch text-black dark:text-zinc-300  text-xs font-normal font-['Manrope']">
                Post adverts of various businesses and top brands on your
                WhatsApp status and earn ₦60 per advert past. The more you post,
                the more you earn.
              </div>
              <div className='py-1.5 justify-start items-center gap-2 inline-flex w-full'>
                <div className='justify-start items-center gap-0.5 flex'>
                  <Icons type='wallet' width={17} height={17} />
                  <div className="dark:opacity-50 text-black dark:text-zinc-400 text-sm font-medium font-['Manrope']">
                    Earning:
                  </div>
                </div>
                <div className="text-[9px] lg:text-sm font-bold font-['Manrope']">
                  ₦60 per Advert Post
                </div>
              </div>
            </div>
            <div className='cursor-pointer w-[109px] flex-col justify-start items-start inline-flex'>
              <Button
                onClick={() => {
                  if (profileDeatils?.membership_fee) {
                    navigate(`/dashboard/earn-advert_whatsapp-task`)
                  } else {
                    onOpen()
                    toast.error('Please activate your membership')
                  }
                }}
                className='self-stretch p-2 primaryBg rounded-none rounded-t-md border border-violet-500 border-opacity-25 justify-center items-center gap-1 inline-flex'
              >
                <div className="text-center text-white text-[10px] font-medium font-['Manrope']">
                  Generate Task
                </div>
              </Button>
              {/* <div className='self-stretch p-1 bg-neutral-600 bg-opacity-10 rounded-bl-md rounded-br-md justify-center items-start gap-3 inline-flex'>
                <div className="text-center  text-[8.83px] font-normal font-['Manrope']">
                  124 Task available
                </div>
              </div> */}
            </div>
          </div>
        </div>

        <div className='self-stretch lg:p-6 bg-gray-200 dark:bg-zinc-900 rounded-lg justify-start items-start gap-2 inline-flex p-2'>
          <Icons type='threads' width={32} height={32} />
          <div className='grow shrink basis-0 justify-between items-start flex flex-col pb-4 gap-y-4 lg:flex-row w-11/12'>
            <div className='max-w-[484px] flex-col justify-start items-start gap-3 inline-flex'>
              <div className=" text-[15px] lg:text-sm font-medium font-['Manrope']">
                Post adverts on your Threads account
              </div>
              <div className="self-stretch text-black dark:text-zinc-300 text-xs font-normal font-['Manrope']">
                Promote advertisements for different businesses and top brands
                on your Threads page and earn ₦110 for each post. The more you
                share, the more you earn. Ensure that your Threads account has
                at least 500 active followers to qualify for this task.
              </div>
              <div className='py-1.5 justify-start items-center gap-2 inline-flex w-full'>
                <div className='justify-start items-center gap-0.5 flex'>
                  <Icons type='wallet' width={17} height={17} />
                  <div className="dark:opacity-50 text-black dark:text-zinc-400 text-sm font-medium font-['Manrope']">
                    Earning:
                  </div>
                </div>
                <div className="text-[9px] lg:text-sm font-bold font-['Manrope']">
                  ₦110 per Advert Post
                </div>
              </div>
            </div>
            <div className='w-[109px] flex-col justify-start items-start inline-flex'>
              <Button
                onClick={() => {
                  if (profileDeatils?.membership_fee) {
                    navigate(`/dashboard/earn-advert_thr-task`)
                  } else {
                    onOpen()
                    toast.error('Please activate your membership')
                  }
                }}
                className='self-stretch p-2 primaryBg rounded-none rounded-t-md border border-violet-500 border-opacity-25 justify-center items-center gap-1 inline-flex'
              >
                <div className="text-center text-white text-[10px] font-medium font-['Manrope']">
                  Generate Task
                </div>
              </Button>
              {/* <div className='self-stretch p-1 bg-neutral-600/opacity-10 rounded-bl-md rounded-br-md justify-center items-start gap-3 inline-flex'>
              <div className="text-center text-white text-[8.83px] font-normal font-['Manrope']">
                124 Task available
              </div>
            </div> */}
            </div>
          </div>
        </div>
      </div>

      {isOpen && (
        <ActivationSmallPaymentmodal2 isOpen={isOpen} onClose={onClose} />
      )}
    </>
  )
}
