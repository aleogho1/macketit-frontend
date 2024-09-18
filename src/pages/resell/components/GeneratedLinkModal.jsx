/* eslint-disable no-irregular-whitespace */
/* eslint-disable react/prop-types */
import { Modal, ModalContent, Snippet } from '@nextui-org/react'
import { AiOutlineClose } from 'react-icons/ai'

export default function GeneratedLinkModal({ isOpen, onClose }) {
  return (
    <div>
      <Modal
        placement='center'
        size='md'
        backdrop='blur'
        isOpen={isOpen}
        onClose={onClose}
        hideCloseButton={true}
        className='rounded-none w-[23rem] md:w-[40rem]'
      >
        <ModalContent className='md:w[40rem] '>
          <div className='  p-12 bg-white rounded flex-col justify-center items-center gap-12 inline-flex'>
            <div
              onClick={onClose}
              className='p-2 primaryBg top-[-20px] -right-2 md:-right-4 absolute z-40 cursor-pointer rounded-[100px] '
            >
              <AiOutlineClose size={20} color='#fff' />
            </div>
            <div className='flex-col justify-center items-center gap-3 flex'>
              <div className="text-primaryText text-sm font-bold font-['Manrope']">
                Links generated!
              </div>
              <div className="w-[253px] text-center text-black text-xs font-normal font-['Manrope']">
                Your Unique Reseller Link has been generated successfully. You
                have to share your unique reseller link along with the product
                images and descriptions to your social network such as Whatsapp,
                Facebook, Instagram etc.
              </div>
            </div>
            <div className='self-stretch  flex-col justify-center items-center gap-2 flex'>
              <div className='self-stretch flex-col justify-start items-center gap-2 flex'>
                <div className="self-stretch text-primaryText dark:text-white text-sm font-medium font-['Manrope']">
                  Share your link
                </div>
                <div className='self-stretch h-[34px] flex-col justify-start items-start gap-[19px] flex'>
                  <div className='self-stretch justifystart items-center gap-2 inline-flex'>
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
                        https://MacketIT-web.vercel.app/7839
                      </Snippet>
                    </div>
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      width='19'
                      height='20'
                      viewBox='0 0 19 20'
                      fill='none'
                    >
                      <path
                        d='M13.5763 7.2013C14.8644 8.12164 16.4425 8.66316 18.1469 8.66316V5.38523C17.8243 5.3853 17.5026 5.35164 17.187 5.28482V7.86502C15.4828 7.86502 13.9049 7.32358 12.6165 6.4033V13.0927C12.6165 16.4391 9.90231 19.1516 6.55445 19.1516C5.30527 19.1516 4.14417 18.7742 3.17969 18.1268C4.28052 19.2519 5.81569 19.9497 7.51403 19.9497C10.8622 19.9497 13.5764 17.2372 13.5764 13.8906V7.2013H13.5763ZM14.7604 3.89427C14.1021 3.17544 13.6698 2.24647 13.5763 1.21944V0.797852H12.6667C12.8957 2.10316 13.6767 3.21833 14.7604 3.89427ZM5.2972 15.559C4.9294 15.077 4.73059 14.4873 4.73148 13.881C4.73148 12.3505 5.97293 11.1096 7.50458 11.1096C7.78998 11.1094 8.07369 11.1532 8.34576 11.2394V7.8882C8.02783 7.84468 7.707 7.82613 7.38631 7.83296V10.4414C7.11412 10.3551 6.83026 10.3113 6.54472 10.3116C5.01314 10.3116 3.77176 11.5524 3.77176 13.0831C3.77176 14.1654 4.39224 15.1025 5.2972 15.559Z'
                        fill='#FF004F'
                      />
                      <path
                        d='M12.6177 6.40323C13.9062 7.32351 15.4839 7.86495 17.1882 7.86495V5.28475C16.2368 5.0822 15.3947 4.58537 14.7615 3.89427C13.6777 3.21827 12.8968 2.10309 12.6679 0.797852H10.2787V13.8905C10.2733 15.4168 9.03395 16.6527 7.50561 16.6527C6.60506 16.6527 5.80492 16.2236 5.29823 15.5589C4.3934 15.1025 3.77285 14.1654 3.77285 13.0832C3.77285 11.5526 5.01423 10.3116 6.54581 10.3116C6.83926 10.3116 7.12209 10.3573 7.3874 10.4414V7.83302C4.0983 7.90096 1.45312 10.587 1.45312 13.8905C1.45312 15.5396 2.11181 17.0346 3.18092 18.127C4.1454 18.7742 5.30644 19.1518 6.55568 19.1518C9.90361 19.1518 12.6177 16.439 12.6177 13.0927L12.6177 6.40323Z'
                        fill='#1E1E1E'
                      />
                      <path
                        d='M17.187 5.28483V4.58731C16.3291 4.58861 15.4882 4.34849 14.7604 3.89441C15.4047 4.59939 16.253 5.08554 17.187 5.28497M12.6667 0.797931C12.6448 0.673214 12.6281 0.547663 12.6165 0.421586V0H9.31757V13.0928C9.31232 14.619 8.07301 15.8548 6.5446 15.8548C6.11131 15.8555 5.68394 15.7542 5.29701 15.5592C5.8037 16.2238 6.60384 16.6528 7.50439 16.6528C9.03267 16.6528 10.2721 15.417 10.2775 13.8907V0.798L12.6667 0.797931ZM7.38639 7.8331V7.09041C7.11073 7.05273 6.83282 7.03389 6.5546 7.034C3.20633 7.034 0.492188 9.74669 0.492188 13.0928C0.492188 15.1906 1.55888 17.0394 3.17984 18.127C2.11074 17.0347 1.45205 15.5397 1.45205 13.8906C1.45205 10.5872 4.09715 7.90103 7.38639 7.8331Z'
                        fill='#00F2EA'
                      />
                    </svg>
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      width='21'
                      height='20'
                      viewBox='0 0 21 20'
                      fill='none'
                    >
                      <path
                        d='M20.1484 10C20.1484 4.47719 15.6713 0 10.1484 0C4.62562 0 0.148438 4.47719 0.148438 10C0.148438 14.9912 3.80531 19.1284 8.58594 19.8785V12.8906H6.04688V10H8.58594V7.79687C8.58594 5.29062 10.0789 3.90625 12.3631 3.90625C13.4572 3.90625 14.6016 4.10156 14.6016 4.10156V6.5625H13.3406C12.0984 6.5625 11.7109 7.33336 11.7109 8.12422V10H14.4844L14.041 12.8906H11.7109V19.8785C16.4916 19.1284 20.1484 14.9913 20.1484 10Z'
                        fill='#1877F2'
                      />
                      <path
                        d='M14.041 12.8906L14.4844 10H11.7109V8.12422C11.7109 7.33328 12.0984 6.5625 13.3406 6.5625H14.6016V4.10156C14.6016 4.10156 13.4572 3.90625 12.363 3.90625C10.0789 3.90625 8.58594 5.29063 8.58594 7.79688V10H6.04688V12.8906H8.58594V19.8785C9.10283 19.9595 9.62524 20.0001 10.1484 20C10.6716 20.0002 11.1941 19.9595 11.7109 19.8785V12.8906H14.041Z'
                        fill='white'
                      />
                    </svg>
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      width='20'
                      height='20'
                      viewBox='0 0 20 20'
                      fill='none'
                    >
                      <path
                        d='M0.575939 9.88041C0.575474 11.5608 1.01454 13.2016 1.84943 14.6478L0.496094 19.589L5.55284 18.2631C6.95147 19.0245 8.51853 19.4235 10.111 19.4236H10.1152C15.3721 19.4236 19.6514 15.1458 19.6537 9.88793C19.6547 7.3401 18.6634 4.94428 16.8623 3.1418C15.0615 1.33948 12.6666 0.346378 10.1148 0.345215C4.85718 0.345215 0.578187 4.62273 0.576016 9.88041'
                        fill='url(#paint0_linear_3253_41711)'
                      />
                      <path
                        d='M0.235289 9.87721C0.234747 11.6181 0.689553 13.3175 1.5542 14.8155L0.152344 19.9339L5.39041 18.5605C6.83366 19.3474 8.45862 19.7622 10.1121 19.7629H10.1164C15.562 19.7629 19.995 15.3312 19.9973 9.88512C19.9982 7.24574 18.9713 4.7638 17.1058 2.89674C15.2402 1.02992 12.7596 0.00108527 10.1164 0C4.66986 0 0.23746 4.43101 0.235289 9.87721ZM3.35475 14.5575L3.15917 14.2471C2.33699 12.9398 1.90304 11.4291 1.90366 9.87783C1.90537 5.35109 5.5894 1.66822 10.1195 1.66822C12.3133 1.66915 14.375 2.52434 15.9257 4.07597C17.4763 5.62775 18.3296 7.69054 18.329 9.8845C18.327 14.4112 14.6429 18.0946 10.1164 18.0946H10.1131C8.63924 18.0938 7.19374 17.698 5.93312 16.95L5.63312 16.7721L2.52475 17.5871L3.35475 14.5575Z'
                        fill='url(#paint1_linear_3253_41711)'
                      />
                      <path
                        d='M7.64491 5.74776C7.45995 5.33668 7.2653 5.32838 7.08941 5.32117C6.94538 5.31497 6.78073 5.31544 6.61623 5.31544C6.45158 5.31544 6.18406 5.37738 5.95794 5.62427C5.73158 5.87141 5.09375 6.46862 5.09375 7.68327C5.09375 8.898 5.97848 10.0719 6.10181 10.2368C6.2253 10.4013 7.8098 12.9737 10.3193 13.9633C12.4048 14.7857 12.8293 14.6222 13.2819 14.5809C13.7346 14.5399 14.7427 13.9839 14.9483 13.4074C15.1541 12.8309 15.1541 12.3368 15.0924 12.2336C15.0307 12.1307 14.8661 12.0689 14.6192 11.9455C14.3722 11.822 13.1584 11.2247 12.9321 11.1423C12.7058 11.06 12.5412 11.0189 12.3765 11.2661C12.2119 11.513 11.7391 12.0689 11.595 12.2336C11.451 12.3986 11.3069 12.4192 11.0601 12.2957C10.8131 12.1718 10.0179 11.9114 9.0746 11.0704C8.34065 10.416 7.84515 9.60784 7.70111 9.36063C7.55708 9.11381 7.68569 8.98001 7.80949 8.85699C7.92042 8.74637 8.05646 8.56869 8.18003 8.42459C8.30313 8.2804 8.34422 8.17753 8.42654 8.01288C8.50894 7.84807 8.4677 7.70389 8.40608 7.5804C8.34422 7.45691 7.86445 6.2359 7.64491 5.74776Z'
                        fill='white'
                      />
                      <defs>
                        <linearGradient
                          id='paint0_linear_3253_41711'
                          x1='958.376'
                          y1='1924.73'
                          x2='958.376'
                          y2='0.345215'
                          gradientUnits='userSpaceOnUse'
                        >
                          <stop stopColor='#1FAF38' />
                          <stop offset='1' stopColor='#60D669' />
                        </linearGradient>
                        <linearGradient
                          id='paint1_linear_3253_41711'
                          x1='992.4'
                          y1='1993.39'
                          x2='992.4'
                          y2='0'
                          gradientUnits='userSpaceOnUse'
                        >
                          <stop stopColor='#F9F9F9' />
                          <stop offset='1' stopColor='white' />
                        </linearGradient>
                      </defs>
                    </svg>
                  </div>
                </div>
              </div>
              <div className='justify-start cursor-pointer items-center gap-2 inline-flex'>
                <div className="opacity-50 text-black text-sm font-medium font-['Manrope']">
                  Download Images
                </div>
                <div className="text-black text-sm font-medium font-['Manrope']">
                  Image 1
                </div>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  width='14'
                  height='14'
                  viewBox='0 0 14 14'
                  fill='none'
                >
                  <path
                    d='M10.5 5.25L7 8.75L3.5 5.25'
                    stroke='#B1B1B1'
                    strokeWidth='1.16667'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                  />
                </svg>
              </div>
              <div className='justify-start cursor-pointer items-center gap-2 inline-flex'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  width='16'
                  height='16'
                  viewBox='0 0 16 16'
                  fill='none'
                >
                  <path
                    d='M8.0013 6.6665V12.6665M10.668 10.6665L8.47271 12.8618C8.21236 13.1221 7.79025 13.1221 7.5299 12.8618L5.33464 10.6665M13.3346 2.6665L2.66797 2.6665'
                    stroke='#FF6DFB'
                    strokeLinecap='round'
                  />
                </svg>
                <div className="text-primaryText text-sm font-medium font-['Manrope']">
                  Download
                </div>
              </div>
            </div>
            <div
              onClick={onClose}
              className='w-[290px] cursor-pointer px-6 py-3.5 bg-primarybutton rounded-[100px] justify-center items-center gap-2 inline-flex'
            >
              <div className="text-center text-white text-[12.83px] font-medium font-['Manrope']">
                Go Home
              </div>
            </div>
          </div>
        </ModalContent>
      </Modal>
    </div>
  )
}
