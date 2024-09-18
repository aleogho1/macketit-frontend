/* eslint-disable react/prop-types */
import { Modal, ModalContent, Snippet } from '@nextui-org/react'
import { AiOutlineClose } from 'react-icons/ai'

export default function CryptoTransfermodal({ isOpen, onClose }) {
  return (
    <Modal
      placement='center'
      size='md'
      backdrop='blur'
      isOpen={isOpen}
      onClose={onClose}
      hideCloseButton={true}
    >
      <ModalContent className='md:w-[28rem] overflow-visible'>
        <div className=' h-[373px] p-12 bg-white rounded flex-col justify-center items-center gap-12 inline-flex'>
          <div
            onClick={onClose}
            className='p-2 primaryBg top-[-20px] -right-4 absolute z-40 cursor-pointer rounded-[100px] '
          >
            <AiOutlineClose size={20} color='#fff' />
          </div>
          <div className='flex-col justify-center items-center gap-3 flex'>
            <div className="text-primaryText text-sm font-bold font-['Manrope']">
              Fund Wallet with Crypto
            </div>
            <div className="w-[253px] text-center text-black text-xs font-normal font-['Manrope']">
              Your Unique Reseller Link has been generated successfully. You
              have to share your unique reseller link along with the product
              images and descriptions to your social network such as Whatsapp,
              Facebook, Instagram etc.
            </div>
          </div>
          <div className='self-stretch h-[52px] flex-col justify-center items-center gap-2 flex'>
            <div className='self-stretch h-[52px] flex-col justify-start items-center gap-2 flex'>
              <div className="self-stretch text-primaryText text-sm font-medium font-['Manrope']">
                USDT (BEP 20)
              </div>
              <div className='self-stretch h-[34px] flex-col justify-start items-start gap-[19px] flex'>
                <div className='self-stretch justify-start items-center gap-2 inline-flex'>
                  <Snippet
                    size='sm'
                    className="grow h-[34px] rounded-none p-2 bg-zinc-400 bg-opacity-30 border border-zinc-400 border-opacity-30 items-center gap-1  shrink basis-0 text-primaryText text-[12.83px] font-normal font-['Manrope']"
                    symbol=''
                    copyIcon={
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        width='18'
                        height='18'
                        viewBox='0 0 18 18'
                        fill='none'
                      >
                        <path
                          d='M12.6 13.5C13.4401 13.5 13.8601 13.5 14.181 13.3365C14.4632 13.1927 14.6927 12.9632 14.8365 12.681C15 12.3601 15 11.9401 15 11.1V3.9C15 3.05992 15 2.63988 14.8365 2.31901C14.6927 2.03677 14.4632 1.8073 14.181 1.66349C13.8601 1.5 13.4401 1.5 12.6 1.5H8.4C7.55992 1.5 7.13988 1.5 6.81901 1.66349C6.53677 1.8073 6.3073 2.03677 6.16349 2.31901C6 2.63988 6 3.05992 6 3.9M5.4 16.5H9.6C10.4401 16.5 10.8601 16.5 11.181 16.3365C11.4632 16.1927 11.6927 15.9632 11.8365 15.681C12 15.3601 12 14.9401 12 14.1V6.9C12 6.05992 12 5.63988 11.8365 5.31901C11.6927 5.03677 11.4632 4.8073 11.181 4.66349C10.8601 4.5 10.4401 4.5 9.6 4.5H5.4C4.55992 4.5 4.13988 4.5 3.81901 4.66349C3.53677 4.8073 3.3073 5.03677 3.16349 5.31901C3 5.63988 3 6.05992 3 6.9V14.1C3 14.9401 3 15.3601 3.16349 15.681C3.3073 15.9632 3.53677 16.1927 3.81901 16.3365C4.13988 16.5 4.55992 16.5 5.4 16.5Z'
                          stroke='black'
                        />
                      </svg>
                    }
                  >
                    euy348y83uy9ru49u9u34903840394039ty
                  </Snippet>
                </div>
              </div>
            </div>
          </div>
          <div className='w-[290px] cursor-pointer px-6 py-3.5 bg-primarybutton rounded-[100px] justify-center items-center gap-2 inline-flex'>
            <div className="text-center text-white text-[12.83px] font-medium font-['Manrope']">
              Continue
            </div>
          </div>
        </div>
      </ModalContent>
    </Modal>
  )
}
