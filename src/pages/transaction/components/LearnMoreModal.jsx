/* eslint-disable no-irregular-whitespace */
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react/prop-types */
import { Modal, ModalContent } from '@nextui-org/react'
import { AiOutlineClose } from 'react-icons/ai'

export default function LearnMoreModal({ isOpen, onClose }) {
  return (
    <>
      <Modal
        placement='center'
        size='2xl'
        backdrop='blur'
        isOpen={isOpen}
        onClose={onClose}
        hideCloseButton={true}
        className='rounded-none'
        scrollBehavior='outside'
      >
        <ModalContent className=' overflow-visible'>
          <div className=' px-[26px] py-8 rounded flex-col justify-start items-center gap-12 inline-flex'>
            <div
              onClick={onClose}
              className='p-2 bg-fuchsia-400 top-[-20px] absolute z-40 -right-2 md:-right-4 cursor-pointer rounded-[100px] '
            >
              <AiOutlineClose size={20} color='#fff' />
            </div>
            <div className='flex-col justify-start items-center gap-3 flex'>
              {/* <div className='justify-start items-center gap-2 inline-flex'>
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
              </div> */}
              <div className="text-center text-zinc-400 text-sm font-semibold font-['Manrope']">
                Turn your social media accounts into a daily source of income
              </div>
            </div>
            <div className='flex-col justify-start items-start gap-6 flex'>
              <div className=" text-zinc-400 text-sm font-normal font-['Manrope']">
                Do you know you can earn daily income by performing social media
                task such as likes, follows, comments, subscribe, share, retweet
                and others. that is one of the so many benefit of becoming a
                member of Trendit³
              </div>
              <div className=" text-zinc-400 text-sm font-normal font-['Manrope']">
                When you activate your account with a one-time membership fee of
                N1000, you get an access to enjoy the benefits listed below:
              </div>
              <div className=''>
                <span className="text-zinc-400 text-sm font-semibold font-['Manrope'] mb-4">
                  {' '}
                  Earn on Your Terms:
                  <br />
                </span>
                <ul className='list-disc flex flex-col gap-y-2'>
                <li className="text-zinc-400 text-sm font-normal font-['Manrope']"> 
                  Short & Simple Tasks: Unlike time-consuming gigs, our tasks
                  are quick and easy to complete – perfect for fitting into your
                  busy schedule. Like posts, follow accounts, share content –
                  it's that simple!
                  </li>
                  <li className="text-zinc-400 text-sm font-normal font-['Manrope']">Earn real money for your completed tasks. Redeem your
                  earnings through convenient payment methods.
                  </li>
                  <br />
                </ul>
                <span className="text-zinc-400 text-sm font-normal font-['Manrope']">
                  <br />
                </span>
                <span className="text-zinc-400 text-sm font-semibold font-['Manrope']">
                  {' '}
                  Boost Your Social Media Presence:
                  <br />
                </span>
                <ul className='list-disc flex flex-col gap-y-2'>
                <li className="text-zinc-400 text-sm font-normal font-['Manrope']">
                  Expand your social circle and explore engaging content by
                  following recommended accounts.
                </li>
                <li className="text-zinc-400 text-sm font-normal font-['Manrope']">
                  Increase Brand Awareness: By completing tasks like liking
                  posts, you can subtly promote your own social media profiles
                  or favorite brands.
                </li>
                <li className="text-zinc-400 text-sm font-normal font-['Manrope']">
                  Stay Current with Trends: Engaging with the latest viral
                  content keeps you in the loop and helps you build a more
                  relevant online presence.
                </li>
                </ul>
                <span className="text-zinc-400 text-sm font-normal font-['Manrope']">
                  <br />
                </span>
                <span className="text-zinc-400 text-sm font-semibold font-['Manrope']">
                  {' '}
                  More than Just Earnings:
                  <br />
                </span>
                <ul className='list-disc flex flex-col gap-y-2'>
                <li className="text-zinc-400 text-sm font-normal font-['Manrope']">
                  Interactive Community: Connect with other app users, share
                  experiences, and learn from each other.
                </li>
                <li className="text-zinc-400 text-sm font-normal font-['Manrope']">
                  Safe & Secure Environment: We prioritize user safety and
                  security. All tasks comply with social media platform
                  guidelines.
                </li>
                <li className="text-zinc-400 text-sm font-normal font-['Manrope']">
                  Fun & Rewarding: Make money while enjoying the social media
                  experience – it's a win-win!
                </li>
                </ul>
              </div>
              <div className=" text-zinc-400 text-sm font-semibold font-['Manrope']">
                Ready to start earning and take control of your social media
                experience? Download our app today!
              </div>
            </div>
          </div>
        </ModalContent>
      </Modal>
    </>
  )
}
