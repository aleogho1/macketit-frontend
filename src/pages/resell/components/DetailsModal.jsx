/* eslint-disable no-irregular-whitespace */
/* eslint-disable react/prop-types */
import {
  Button,
  Image,
  Modal,
  ModalContent,
  useDisclosure,
} from '@nextui-org/react'
import { AiOutlineClose } from 'react-icons/ai'
// import imgplaceholder from '../../../assets/Rectangle5.svg'
import GeneratedLinkModal from './GeneratedLinkModal'

export default function DetailsModal({ isOpen, onClose, fetchSingleItem }) {
  const {
    isOpen: isLinkGenerated,
    onOpen: openLinkGenerated,
    onClose: closeLinkGenerated,
  } = useDisclosure()

  const handleLinkGenerated = () => {
    onClose()
    openLinkGenerated()
  }

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
          className='rounded-none w-[23rem] md:w-[28rem]'
        >
          <ModalContent className='overflow-visible'>
            <div className='p-6 bg-white rounded flex-col justify-center items-center gap-12 inline-flex'>
              <div
                onClick={onClose}
                className='p-2 primaryBg top-[-20px] -right-2 md:-right-4 absolute z-40  cursor-pointer rounded-[100px] '
              >
                <AiOutlineClose size={20} color='#fff' />
              </div>
              <div className='flex-col justify-center items-center gap-3 flex'>
                <div className="text-black text-sm font-bold font-['Manrope']">
                  How would you like to pay?
                </div>
                <div className="w-[253px] text-center text-black text-xs font-normal font-['Manrope']">
                  Are you sure you want to generate your next Twitter task now.
                  You have 1 hour to perform this task. Please confirm only if
                  you are ready to perform the task.
                </div>
              </div>
              <div className='flex-col justify-start items-center gap-3 flex'>
                <div className='self-stretch  p-6 bg-zinc-400 bg-opacity-30 rounded-lg flex-col justify-start items-start gap-2 flex'>
                  <div className='w-[339px]  relative bg-neutral-800'>
                    <Image
                      className='w-[365px] h-[15rem] rounded-none opacity-50'
                      // src={imgplaceholder}
                      src={fetchSingleItem?.item_img}
                    />
                    <div className='w-[316.50px] z-10 left-[11px] top-[7.5rem] lg:top-[10rem] 2xl:top-[13rem] absolute justify-between items-center inline-flex'>
                      <div className='justify-start items-start gap-0.5 flex'>
                        <div className='p-1 bg-white  rounded justify-start items-start gap-[29px] flex'>
                          <div className='justify-start items-center gap-2.5 flex'>
                            <div className="text-blue-600 text-xs font-normal font-['Manrope']">
                              #Cars
                            </div>
                          </div>
                        </div>
                        <div className='p-1 bg-white rounded justify-start items-start gap-[29px] flex'>
                          <div className='justify-start items-center gap-2.5 flex'>
                            <div className="text-blue-600 text-xs font-normal font-['Manrope']">
                              #Cars
                            </div>
                          </div>
                        </div>
                        <div className='p-1 bg-white rounded justify-start items-start gap-[29px] flex'>
                          <div className='justify-start items-center gap-2.5 flex'>
                            <div className="text-blue-600 text-xs font-normal font-['Manrope']">
                              #Cars
                            </div>
                          </div>
                        </div>
                        <div className='p-1 bg-white rounded justify-start items-start gap-[29px] flex'>
                          <div className='justify-start items-center gap-2.5 flex'>
                            <div className="text-blue-600 text-xs font-normal font-['Manrope']">
                              #Cars
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className='justify-start z-20 items-start gap-[2.50px] flex'>
                        <div className='w-[6.50px] h-[6.50px] bg-white bgstone-900 rounded-full' />
                        <div className='w-[6.50px] h-[6.50px] bg-white bgstone-900 rounded-full' />
                        <div className='w-[6.50px] h-[6.50px] bg-white bgstone-900 rounded-full' />
                      </div>
                    </div>
                  </div>
                  <div className='self-stretch justify-start items-start gap-2 inline-flex'>
                    <div className='grow shrink basis-0 flex-col justify-start items-start gap-3 inline-flex'>
                      <div className='self-stretch justify-between items-start inline-flex'>
                        <div className="w-[221px] text-primaryText text-sm font-medium font-['Manrope']">
                          {fetchSingleItem?.name} on sales @{' '}
                          {fetchSingleItem?.phone}
                        </div>
                        <svg
                          xmlns='http://www.w3.org/2000/svg'
                          width='16'
                          height='17'
                          viewBox='0 0 16 17'
                          fill='none'
                        >
                          <path
                            d='M2.66602 4.12842V14.6527C2.66602 15.0244 3.05717 15.2662 3.38962 15.0999L7.10492 13.2423C7.66798 12.9608 8.33072 12.9608 8.89378 13.2423L12.6091 15.0999C12.9415 15.2662 13.3327 15.0244 13.3327 14.6527V4.12842C13.3327 3.02385 12.4372 2.12842 11.3327 2.12842H4.66602C3.56145 2.12842 2.66602 3.02385 2.66602 4.12842Z'
                            stroke='black'
                            strokeLinecap='round'
                          />
                        </svg>
                      </div>
                      <div className='self-stretch  flex-col justify-start items-start flex'>
                        <div className='py-1.5 justify-start items-center gap-2 inline-flex'>
                          <div className='justify-start items-center gap-0.5 flex'>
                            <svg
                              xmlns='http://www.w3.org/2000/svg'
                              width='17'
                              height='18'
                              viewBox='0 0 17 18'
                              fill='none'
                            >
                              <g clipPath='url(#clip0_3660_17081)'>
                                <path
                                  d='M4.95898 12.8368L12.0423 5.75342M5.40152 6.19608H5.93277M5.40152 6.72733H5.93277M11.0682 11.8627H11.5994M11.0682 12.394H11.5994M16.2923 9.29508C16.2923 13.5983 12.8039 17.0868 8.50065 17.0868C4.19743 17.0868 0.708984 13.5983 0.708984 9.29508C0.708984 4.99187 4.19743 1.50342 8.50065 1.50342C12.8039 1.50342 16.2923 4.99187 16.2923 9.29508ZM6.37565 6.46175C6.37565 6.85295 6.05852 7.17008 5.66732 7.17008C5.27612 7.17008 4.95898 6.85295 4.95898 6.46175C4.95898 6.07055 5.27612 5.75342 5.66732 5.75342C6.05852 5.75342 6.37565 6.07055 6.37565 6.46175ZM12.0423 12.1284C12.0423 12.5196 11.7252 12.8368 11.334 12.8368C10.9428 12.8368 10.6257 12.5196 10.6257 12.1284C10.6257 11.7372 10.9428 11.4201 11.334 11.4201C11.7252 11.4201 12.0423 11.7372 12.0423 12.1284Z'
                                  stroke='black'
                                  strokeLinecap='round'
                                />
                              </g>
                              <defs>
                                <clipPath id='clip0_3660_17081'>
                                  <rect
                                    width='17'
                                    height='17'
                                    fill='white'
                                    transform='translate(0 0.794922)'
                                  />
                                </clipPath>
                              </defs>
                            </svg>
                            <div className="opacity-50 text-black text-sm font-medium font-['Manrope']">
                              Commission
                            </div>
                          </div>
                          <div className="text-primaryText text-sm font-bold font-['Manrope']">
                            ₦{fetchSingleItem?.price} {''} per sale
                          </div>
                        </div>
                      </div>
                      <div className='self-stretch  justify-start items-center gap-3 inline-flex'>
                        <Button className='grow shrink basis-0   p-2 bg-white rounded-sm border border-violet-500 border-opacity-25 justify-center items-center gap-1 flex'>
                          <div className="text-center text-black text-[10px] font-medium font-['Manrope']">
                            Buy this product
                          </div>
                        </Button>
                        <Button className='grow shrink  basis-0 p-2 primaryBg rounded-sm border border-violet-500 border-opacity-25 justify-center items-center gap-1 flex'>
                          <div className="text-center text-white text-[10px] font-medium font-['Manrope']">
                            Resell this product
                          </div>
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
                <div className='self-stretch p-3 bg-sky-100 justify-start items-start gap-[29px] inline-flex'>
                  <div className='grow shrink basis-0 h[50px] justify-start items-center gap-2.5 flex'>
                    <div className="grow shrink basis-0 text-blue-600 text-xs font-normal font-['Manrope']">
                      You must NOT UNLIKE or UNFOLLOW the Facebook page after
                      you have like and followed the page. Your MacketIT account
                      will be suspended once you UNLIKE or UNFOLLOW the Facebook
                      Page.
                    </div>
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      width='20'
                      height='21'
                      viewBox='0 0 20 21'
                      fill='none'
                    >
                      <path
                        d='M9.99935 14.1362V9.96956M9.99935 7.46956V7.46123M18.3327 10.7948C18.3327 15.3971 14.6017 19.1281 9.99935 19.1281C5.39698 19.1281 1.66602 15.3971 1.66602 10.7948C1.66602 6.19239 5.39698 2.46143 9.99935 2.46143C14.6017 2.46143 18.3327 6.19239 18.3327 10.7948Z'
                        stroke='#1877F2'
                        strokeWidth='2'
                        strokeLinecap='round'
                      />
                    </svg>
                  </div>
                </div>
              </div>
              <div
                // onClick={openLinkGenerated}
                onClick={handleLinkGenerated}
                className='w-[290px] cursor-pointer px-6 py-3.5 bg-primarybutton rounded-[100px] justify-center items-center gap-2 inline-flex'
              >
                <div className="text-center text-white text-[12.83px] font-medium font-['Manrope']">
                  Generate Reseller Link
                </div>
              </div>
            </div>
          </ModalContent>
        </Modal>
      </div>

      {isLinkGenerated && (
        <GeneratedLinkModal
          isOpen={isLinkGenerated}
          onClose={closeLinkGenerated}
        />
      )}
    </>
  )
}
