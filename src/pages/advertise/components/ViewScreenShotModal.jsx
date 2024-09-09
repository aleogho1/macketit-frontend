/* eslint-disable no-irregular-whitespace */
/* eslint-disable react/prop-types */
import { Modal, ModalContent, Image } from '@nextui-org/react'
import { AiOutlineClose } from 'react-icons/ai'

export default function ViewScreenShotModal({
  isOpen,
  onClose,
  proof_screenshot_path,
}) {
  return (
    <>
      <div>
        <Modal
          placement='center'
          size='md'
          backdrop='blur'
          isOpen={isOpen}
          onClose={onClose}
          hideCloseButton={true}
          className='rounded-none w-[23rem] md:w-[30rem]'
          scrollBehavior='outside'
        >
          <ModalContent className=' overflow-visible'>
            <div className='p-6 md:p-12 rounded flex-col justify-center items-center gap-12 inline-flex'>
              <div
                onClick={onClose}
                className='p-2 bg-fuchsia-400 top-[-20px] -right-2 md:-right-4 absolute z-40  cursor-pointer rounded-[100px] '
              >
                <AiOutlineClose size={20} color='#fff' />
              </div>

              <div className='self-stretch flex-col justify-center items-start gap-6 flex'>
                <div className='self-stretch  flex-col justify-start items-center gap-[18px] flex'>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    width='49'
                    height='49'
                    viewBox='0 0 49 49'
                    fill='none'
                  >
                    <path
                      d='M22.5 10.2949H26.5M18.9 44.2949H30.1C32.3402 44.2949 33.4603 44.2949 34.316 43.8589C35.0686 43.4755 35.6805 42.8635 36.064 42.1109C36.5 41.2552 36.5 40.1351 36.5 37.8949V10.6949C36.5 8.45471 36.5 7.33461 36.064 6.47896C35.6805 5.72631 35.0686 5.11439 34.316 4.7309C33.4603 4.29492 32.3402 4.29492 30.1 4.29492H18.9C16.6598 4.29492 15.5397 4.29492 14.684 4.7309C13.9314 5.11439 13.3195 5.72631 12.936 6.47896C12.5 7.33461 12.5 8.45471 12.5 10.6949V37.8949C12.5 40.1351 12.5 41.2552 12.936 42.1109C13.3195 42.8635 13.9314 43.4755 14.684 43.8589C15.5397 44.2949 16.6598 44.2949 18.9 44.2949Z'
                      stroke='#CB29BE'
                      strokeWidth='2'
                      strokeLinecap='round'
                    />
                  </svg>

                  <div className="text-sm font-bold font-['Manrope']">
                    Screenshot / Proof Of Work
                  </div>

                  <Image
                    className='w-full'
                    src={proof_screenshot_path}
                    alt='screet_shoot'
                  />
                </div>
              </div>
            </div>
          </ModalContent>
        </Modal>
      </div>
    </>
  )
}
