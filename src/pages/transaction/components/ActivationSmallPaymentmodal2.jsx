/* eslint-disable no-irregular-whitespace */
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react/prop-types */
import { Button, Modal, ModalContent, useDisclosure } from '@nextui-org/react'
import { AiOutlineClose } from 'react-icons/ai'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { useActivateMembership } from '../../../api/walletApi'
import Loader from '../../Loader'
import ActivationPaymentmodal2 from './ActivationPaymentmodal2'

export default function ActivationSmallPaymentmodal2({ isOpen, onClose }) {
  const { handleSubmit } = useForm({
    defaultValues: {
      amount: 1000,
    },
  })

  const { mutateAsync: ativateMembership, isPending } = useActivateMembership()
  const {
    isOpen: isOpenMore,
    onOpen: onOpenMore,
    onClose: onCloseMore,
  } = useDisclosure()

  const onSubmit = async (data) => {
    try {
      const res = await ativateMembership({ data })
      if (res.data.status) {
        toast.success(res.data.message, {
          position: 'top-right',
          duration: 20000,
        })
        const authorizationUrl = res?.data?.authorization_url
        if (authorizationUrl) {
          localStorage.setItem('paystack_redirect', window.location.pathname)
          window.open(authorizationUrl) // Open the URL in a new tab
        }
        onClose()
      }
    } catch (error) {
      toast.error(error.response?.data?.message ?? error.message, {
        position: 'top-right',
        duration: 20000,
      })
    }
  }
  // const handleViewMore = () => {
  // onClose()
  // setTimeout(() => {
  // setShowNewModal(true)
  // console.log('llloj')
  // console.log(onOpenMore, showNewModal)
  // onOpenMore()
  // console.log('lffffoj')
  // }, 300) // Adjust the timeout as needed to ensure the current modal has time to close
  // }

  return (
    <>
      <Modal
        placement='center'
        size='md'
        backdrop='blur'
        isOpen={isOpen}
        onClose={onClose}
        hideCloseButton={true}
        className='rounded-none'
        scrollBehavior='outside'
      >
        <ModalContent className=' overflow-visible'>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className='w-full px-[26px] py-8 rounded flex-col justify-start items-center gap-12 inline-flex'>
              <div
                onClick={onClose}
                className='p-2 bg-fuchsia-400 top-[-20px] absolute z-40 -right-2 md:-right-4 cursor-pointer rounded-[100px] '
              >
                <AiOutlineClose size={20} color='#fff' />
              </div>
              <div className='flex-col justify-start items-center gap-3 flex'>
                <div className='justify-start items-center gap-2 inline-flex'>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    width='16'
                    height='16'
                    viewBox='0 0 16 16'
                    fill='none'
                  >
                    <g clipPath='url(#clip0_4523_35644)'>
                      <path
                        d='M7.99998 9.66659C10.3012 9.66659 12.1666 7.80111 12.1666 5.49992C12.1666 3.19873 10.3012 1.33325 7.99998 1.33325C5.69879 1.33325 3.83331 3.19873 3.83331 5.49992C3.83331 7.80111 5.69879 9.66659 7.99998 9.66659ZM7.99998 9.66659C4.31808 9.66659 1.33331 11.9052 1.33331 14.6666M7.99998 9.66659C11.6819 9.66659 14.6666 11.9052 14.6666 14.6666'
                        stroke='white'
                        strokeWidth='2'
                        strokeLinecap='round'
                      />
                    </g>
                    <defs>
                      <clipPath id='clip0_4523_35644'>
                        <rect width='16' height='16' fill='white' />
                      </clipPath>
                    </defs>
                  </svg>
                  <div className="text-base font-bold font-['Manrope']">
                    Become A memeber Today
                  </div>
                </div>
                <div className="text-center text-zinc-400 text-sm font-semibold font-['Manrope']">
                  Turn your social media accounts into a daily source of income
                </div>
              </div>
              <div className='flex-col justify-start items-start gap-6 flex'>
                <div className=" text-zinc-400 text-sm font-normal font-['Manrope']">
                  Do you know you can earn daily income by performing social
                  media task such as likes, follows, comments, subscribe, share,
                  retweet and others. that is one of the so many benefit of
                  becoming a member of MacketIT³
                </div>

                <div className=''>
                  <span className="text-zinc-400 text-sm font-semibold font-['Manrope']">
                    {' '}
                    Earn on Your Terms:
                    <br />
                  </span>
                  <span className="text-zinc-400 text-sm font-normal font-['Manrope']">
                    Short & Simple Tasks: Unlike time-consuming gigs, our tasks
                    are quick and easy to complete – perfect for fitting into
                    your busy schedule. Like posts, follow accounts, share
                    content – it's that simple!
                    <br />
                  </span>
                  <span className="text-zinc-400 text-sm font-normal font-['Manrope']">
                    <br />
                  </span>
                </div>
                <div onClick={onOpenMore} className='cursor-pointer'>
                  Click here to read more about MacketIT³
                </div>
              </div>
              <div className='w-full px-3 py-6 bg-zinc-400 bg-opacity-30 rounded justify-between itemscenter flex flex-col'>
                <div className=" px-2 text-[12.83px] font-medium font-['Manrope']">
                  Membership Fee
                </div>
                <div className='self-stretch px-2 md:justify-between items-center gap-2 inline-flex'>
                  <div className="w-40 text-3xl font-medium font-['Manrope']">
                    ₦{1000?.toLocaleString()}
                  </div>
                  <Button
                    type='submit'
                    isDisabled={isPending}
                    className='md:w-[290px]  cursor-pointer px-6 py-6 bg-fuchsia-600 rounded-[100px] justify-center items-center gap-2 inline-flex'
                  >
                    {isPending ? <Loader /> : 'Click here to Pay'}
                  </Button>
                </div>
              </div>
            </div>
          </form>
        </ModalContent>
      </Modal>

      {isOpenMore && (
        <ActivationPaymentmodal2 isOpen={isOpenMore} onClose={onCloseMore} />
      )}
    </>
  )
}
