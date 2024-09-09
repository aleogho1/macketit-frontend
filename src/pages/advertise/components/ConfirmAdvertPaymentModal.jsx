/* eslint-disable no-irregular-whitespace */
/* eslint-disable react/prop-types */
import { Modal, ModalContent } from '@nextui-org/react'
import { AiOutlineClose } from 'react-icons/ai'

export default function ConfirmAdvertPaymentModal({ isOpen, onClose }) {
  return (
    <div>
      <Modal
        placement='center'
        size='md'
        backdrop='blur'
        isOpen={isOpen}
        onClose={onClose}
        hideCloseButton={true}
        className='rounded-none w-[23rem] md:w-[28rem]'
      >
        <ModalContent className=' overflow-visible '>
          <div className=' p-6 bg-white rounded flex-col justify-center items-center gap-12 inline-flex'>
            <div
              onClick={onClose}
              className='p-2 bg-fuchsia-400 top-[-20px] -right-2 md:-right-4 absolute z-40 cursor-pointer rounded-[100px] '
            >
              <AiOutlineClose size={20} color='#fff' />
            </div>
            <div className='flex-col justify-center items-center gap-3 flex'>
              <div className="text-stone-900 text-sm font-bold font-['Manrope']">
                How would you like to pay?
              </div>
            </div>
            <div className='self-stretch h-[261px] flex-col justify-center items-center gap-3 flex'>
              <div className='self-stretch h-[175px] p-3 bg-zinc-400 bg-opacity-30 rounded flex-col justify-center items-center gap-2 flex'>
                <div className='w-[127px] px-2 flex-col justify-center items-center gap-2 flex'>
                  <div className="text-center text-stone-900 text-[12.83px] font-medium font-['Manrope']">
                    Total Pay
                  </div>
                  <div className="text-stone-900 text-3xl font-medium font-['Manrope']">
                    ₦589 .90
                  </div>
                </div>
                <div className='self-stretch justify-between items-center inline-flex'>
                  <div className="text-black text-[12.83px] font-normal font-['Manrope']">
                    Amount due to task
                  </div>
                  <div className="text-black text-[12.83px] font-normal font-['Manrope']">
                    $500
                  </div>
                </div>
                <div className='self-stretch justify-between items-center inline-flex'>
                  <div className="text-black text-[12.83px] font-normal font-['Manrope']">
                    Wallet balance after this payment
                  </div>
                  <div className="text-black text-[12.83px] font-normal font-['Manrope']">
                    $500
                  </div>
                </div>
              </div>
              <div className='self-stretch p-3 bg-sky-100 justify-start items-start gap-[29px] inline-flex'>
                <div className='grow shrink basis-0 h-[50px] justify-start items-center gap-2.5 flex'>
                  <div className="grow shrink basis-0 text-blue-600 text-xs font-normal font-['Manrope']">
                    You must NOT UNLIKE or UNFOLLOW the page after you
                    have like and followed the page. Your Trendit³ account will
                    be suspended once you UNLIKE or UNFOLLOW the Page.
                  </div>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    width='20'
                    height='20'
                    viewBox='0 0 20 20'
                    fill='none'
                  >
                    <path
                      d='M10.0013 13.3413V9.17464M10.0013 6.67464V6.66631M18.3346 9.99984C18.3346 14.6022 14.6037 18.3332 10.0013 18.3332C5.39893 18.3332 1.66797 14.6022 1.66797 9.99984C1.66797 5.39746 5.39893 1.6665 10.0013 1.6665C14.6037 1.6665 18.3346 5.39746 18.3346 9.99984Z'
                      stroke='#1877F2'
                      strokeWidth='2'
                      strokeLinecap='round'
                    />
                  </svg>
                </div>
              </div>
            </div>
            <div className='w-[290px] px-6 py-3.5 bg-fuchsia-600 rounded-[100px] justify-center items-center gap-2 inline-flex'>
              <div className="text-center text-white text-[12.83px] font-medium font-['Manrope']">
                Proceed
              </div>
            </div>
          </div>
        </ModalContent>
      </Modal>
    </div>
  )
}
