/* eslint-disable react/prop-types */
import { Modal, ModalContent, Button } from '@nextui-org/react'
import { AiOutlineClose } from 'react-icons/ai'

export default function ConfirmPasswordResetModal({ isOpen, onClose }) {
  return (
    <>
      <Modal
        placement='center'
        size='md'
        backdrop='blur'
        isOpen={isOpen}
        onClose={onClose}
        hideCloseButton={true}
        className='rounded-none w-[23rem] md:w-[28rem]'
      >
        <ModalContent className='overflow-visible '>
          <div className='p-6 bg-white rounded flex-col justify-center items-center gap-6 inline-flex'>
            <div
              onClick={onClose}
              className='p-2 bg-primaryBg top-[-20px] absolute z-40 -right-2 md:-right-4 cursor-pointer rounded-[100px] '
            >
              <AiOutlineClose size={20} color='#fff' />
            </div>
            <div className='w-12 h-12 relative' />
            <div className='flex-col justify-center items-center gap-3 flex'>
              <div className="text-stone-900 text-2xl font-bold font-['Manrope']">
                Verify Your Account
              </div>
              <div className="w-[253px] text-center text-black text-xs font-normal font-['Manrope']">
                A message has been sent to this email address verify to reset
                password
              </div>
            </div>
            <Button className='w-[290px] px-6 py-6 bg-fuchsia-600 rounded-[100px] justify-center items-center gap-2 inline-flex'>
              <a
                href='https://mail.google.com'
                target='_blank'
                rel='noreferrer'
              >
                <div className="text-center text-white text-[12.83px] font-medium font-['Manrope']">
                  Open Email App
                </div>
              </a>
            </Button>
          </div>
        </ModalContent>
      </Modal>
    </>
  )
}
