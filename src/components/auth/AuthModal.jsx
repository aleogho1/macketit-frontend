/* eslint-disable react/prop-types */
import { Modal, ModalContent, Button, Checkbox, Image } from '@nextui-org/react'
import { useState } from 'react'
import modalImage from '../../assets/composition14.svg'
import { AiOutlineClose } from 'react-icons/ai'
import { useNavigate } from 'react-router'

export default function AuthModal({ isOpen, onClose }) {
  const [isChecked, setIsChecked] = useState(false)
  const navigate = useNavigate()

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked)
  }
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
          <div className=' px-4 md:px-12 md:w-[28rem] rounded-none flex-col justify-start items-center inline-flex'>
            <div
              onClick={onClose}
              className='p-2 bg-primaryBg top-[-20px] -right-2 md:-right-4 absolute z-40  cursor-pointer rounded-[100px] '
            >
              <AiOutlineClose size={20} color='#fff' />
            </div>

            <Image
              src={modalImage}
              alt='modal image'
              width={419}
              height={424}
              className='rounded-none py-4 pt-5 md:pt-10'
            />
            <div className=' py-6 flex-col justify-start items-center gap-6 flex'>
              <div className="w-80 text-center text-[32px] font-semibold font-['Manrope'] leading-[26.88px]">
                All Set!
              </div>
              <div className=" md:self-stretch w-full px-2 text-center text-zinc-400 text-base font-normal font-['Manrope']">
                One more question. Your answer will help us tailor how your
                dashboard will look like.
              </div>
              <div className='md:self-stretch w-full px-3 flex-col justify-start items-center gap-3 flex'>
                <div className='self-stretch px-3 py-2 bg-default/70 rounded justify-start items-center gap-[7px] inline-flex'>
                  <Checkbox
                    checked={isChecked}
                    onChange={handleCheckboxChange}
                    // color='secondary'
                    // className='text-white'
                    radius='none'
                    color='secondary'
                    className='text-white'
                    classNames={{
                      label:
                        "grow shrink basis-0  dark:text-opacity-50 text-[12.83px] font-medium font-['Manrope']",
                    }}
                  />
                  <div className="text-center text-sm font-medium font-['Manrope']">
                    I came to Advertise
                  </div>
                </div>
                <div className='self-stretch px-3 py-2 bg-default/70 rounded justify-start items-center gap-[7px] inline-flex'>
                  <Checkbox
                    radius='none'
                    color='secondary'
                    className='text-white'
                    classNames={{
                      label:
                        "grow shrink basis-0 dark:text-opacity-50 text-[12.83px] font-medium font-['Manrope']",
                    }}
                  />
                  <div className="text-center text-sm font-medium font-['Manrope']">
                    I came to Earn
                  </div>
                </div>
              </div>
              <Button
                onClick={() => {
                  navigate('/dashboard/home')
                }}
                className=" w-[18rem] md:w-[20rem] text-center text-white text-[12.83px] font-medium font-['Manrope'] px-6 py-3 bg-primarybutton rounded-[100px] justify-center items-center gap-2 inline-flex"
              >
                Continue
              </Button>
            </div>
          </div>
        </ModalContent>
      </Modal>
    </>
  )
}
