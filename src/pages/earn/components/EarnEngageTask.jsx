/* eslint-disable react/prop-types */
/* eslint-disable no-irregular-whitespace */

import { useNavigate } from 'react-router-dom'
import { AvatarGroup, Image, Input, Link } from '@nextui-org/react'
import Igframe from '../../../assets/IGFrame131.svg'
import usersImage from '../../../assets/RectangleUser.svg'
import { usePerformTask } from '../../../api/earnApi'

export default function EarnEngageTask() {
  const { data: fetchTask } = usePerformTask()
  console.log(fetchTask, 'Task')
  function CustomAvatar({ src }) {
    return (
      <img
        className='w-[42px] h-[42px] rounded-[100px] border-2 border-stone-900'
        src={src}
        alt='Avatar'
      />
    )
  }
  const navigate = useNavigate()
  return (
    <div>
      <div className=' p-3 flex-col justify-start items-start gap-3 inline-flex'>
        <div className='justify-start cursor-pointer items-center gap-[7px] inline-flex'>
          <div onClick={() => navigate(-1)} className='cursor-pointer'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              width='24'
              height='24'
              viewBox='0 0 24 24'
              fill='none'
            >
              <path
                d='M18.9998 12H5.99985M10.9998 6L5.70696 11.2929C5.31643 11.6834 5.31643 12.3166 5.70696 12.7071L10.9998 18'
                stroke='black'
                strokeWidth='2'
                strokeLinecap='round'
              />
            </svg>
          </div>
          <div className="text-center text-fuchsia-400 text-sm font-medium font-['Manrope']">
            Go back
          </div>
        </div>

        <div className='self-stretch  border border-white flex-col justify-start items-start flex'>
          <div className='self-stretch  p-6 bg-zinc-400 bg-opacity-30 rounded-tl-lg rounded-tr-lg flex-col justify-start items-start gap-2 flex'>
            <div className='flex-col justify-start items-start gap-1.5 flex'>
              <div className="self-stretch text-stone-900 text-[10px] font-normal font-['Manrope']">
                Jan 12th 9:27pm
              </div>
              <div className="text-stone-900 text-3xl font-medium font-['Manrope']">
                Like and follow instagram page
              </div>
              <div className='py-1.5 justify-start items-center gap-2 inline-flex'>
                <div className='justify-start items-center gap-0.5 flex'>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    width='17'
                    height='17'
                    viewBox='0 0 17 17'
                    fill='none'
                  >
                    <path
                      d='M14.168 7.0835H11.6888C11.4932 7.0835 11.3346 7.24206 11.3346 7.43766V10.271C11.3346 10.4666 11.4932 10.6252 11.6888 10.6252H14.168M14.168 7.0835H15.2305C15.4261 7.0835 15.5846 7.24206 15.5846 7.43766V10.271C15.5846 10.4666 15.4261 10.6252 15.2305 10.6252H14.168M14.168 7.0835V5.10016C14.168 4.30675 14.168 3.91005 14.0136 3.60701C13.8777 3.34045 13.661 3.12372 13.3945 2.9879C13.0914 2.8335 12.6947 2.8335 11.9013 2.8335H3.68464C2.89123 2.8335 2.49452 2.8335 2.19148 2.9879C1.92492 3.12372 1.7082 3.34045 1.57238 3.60701C1.41797 3.91005 1.41797 4.30675 1.41797 5.10016V11.9002C1.41797 12.6936 1.41797 13.0903 1.57238 13.3933C1.7082 13.6599 1.92492 13.8766 2.19148 14.0124C2.49452 14.1668 2.89123 14.1668 3.68464 14.1668H11.9013C12.6947 14.1668 13.0914 14.1668 13.3945 14.0124C13.661 13.8766 13.8777 13.6599 14.0136 13.3933C14.168 13.0903 14.168 12.6936 14.168 11.9002V10.6252'
                      stroke='black'
                    />
                  </svg>
                  <div className="opacity-50 text-black text-sm font-medium font-['Manrope']">
                    Pricing
                  </div>
                </div>
                <div className="text-stone-900 text-sm font-bold font-['Manrope']">
                  ₦150 per Advert post
                </div>
              </div>
              <div className='self-stretch justify-start items-start gap-3 inline-flex'>
                <div className="text-stone-900 text-[9px] font-normal font-['Manrope'] uppercase tracking-tight">
                  20+ people
                </div>
                <div className="text-stone-900 text-[9px] font-normal font-['Manrope'] uppercase tracking-tight">
                  134 Likes
                </div>
                <div className="text-stone-900 text-[9px] font-normal font-['Manrope'] uppercase tracking-tight">
                  453 Comments
                </div>
              </div>
            </div>
            <div className='w-40 hidden md:w-[304.97px] origin-top-left  absolute right-[1.7rem] top-[9.5rem] justify-start items-start gap-[115.18px] md:inline-flex'>
              <Image src={Igframe} alt='igFrme' className='h- md:h-[10.1rem]' />
            </div>
          </div>
          <div className='self-stretch p-3 bg-sky-100 justify-start items-start gap-[29px] inline-flex'>
            <div className='grow shrink basis-0 justify-start items-center gap-2.5 flex'>
              <div className="grow shrink basis-0 text-blue-600 text-xs font-normal font-['Manrope']">
                You must NOT UNLIKE or UNFOLLOW the Facebook page after you have
                like and followed the page. Your Trendit³ account will be
                suspended once you UNLIKE or UNFOLLOW the Facebook Page.
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

        <div className='w-full px-3 py-6 bg-red-300 rounded-lg flex-col justify-start items-center gap-3 inline-flex'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            width='17'
            height='17'
            viewBox='0 0 17 17'
            fill='none'
          >
            <path
              d='M3.54297 1.41663H13.4596M3.54297 15.5833H13.4596M4.2513 1.41663V4.24996C4.2513 6.59717 6.15409 8.49996 8.5013 8.49996M12.7513 15.5833V12.75C12.7513 10.4027 10.8485 8.49996 8.5013 8.49996M8.5013 8.49996C6.15409 8.49996 4.2513 10.4027 4.2513 12.75V15.5833M8.5013 8.49996C10.8485 8.49996 12.7513 6.59717 12.7513 4.24996V1.41663M10.6263 4.24996C10.6263 5.42356 9.67491 6.37496 8.5013 6.37496C7.3277 6.37496 6.3763 5.42356 6.3763 4.24996M6.3763 13.4583H10.6263'
              stroke='black'
              strokeLinecap='round'
            />
          </svg>
          <div className="self-stretch text-center text-black text-xs font-semibold font-['Manrope']">
            59:23
          </div>
        </div>
        <div className='grid md:self-stretch justify-start items-start gap-3 md:inline-flex'>
          <div className='grow shrink basis-0 self-stretch p-3 bg-zinc-400 bg-opacity-30 rounded-lg flex-col justify-start items-center gap-10 inline-flex'>
            <div className='self-stretch py-6 flex-col justify-start items-center gap-3 flex'>
              <div className='self-stretch py-3 justify-start items-start gap-2 inline-flex'>
                <div className="grow shrink basis-0 text-center text-stone-900 text-2xl font-medium font-['Manrope']">
                  Task
                </div>
              </div>
            </div>
            <div className=' flex-col justify-start items-center gap-8 flex'>
              <div className='self-stretch  flex-col justify-start items-center gap-3  flex'>
                <div className='self-stretch'>
                  <span className="text-black text-xs font-semibold font-['Manrope']">
                    Please follow the step-by-step instructions below to do your
                    task:
                    <br />
                    Step 1: 
                  </span>
                  <span className="text-black text-xs font-normal font-['Manrope']">
                    Open the Task Link above on your Facebook Mobile App or
                    browser
                    <br />
                  </span>
                  <span className="text-black text-xs font-semibold font-['Manrope']">
                    Step 2: 
                  </span>
                  <span className="text-black text-xs font-normal font-['Manrope']">
                    The link will direct you to a Facebook Page which you are
                    meant to like and follow.
                    <br />
                  </span>
                  <span className="text-black text-xs font-semibold font-['Manrope']">
                    Step 3: 
                  </span>
                  <span className="text-black text-xs font-normal font-['Manrope']">
                    Click on the Like or Follow button on the Facebook Page to
                    start liking or following the page. You MUST NOT Unfollow
                    the account after you have followed the account.
                    <br />
                  </span>
                  <span className="text-black text-xs font-semibold font-['Manrope']">
                    Step 4: 
                  </span>
                  <span className="text-black text-xs font-normal font-['Manrope']">
                    Create a screenshot of the page that shows you have liked or
                    followed the page and upload the screenshot under the Proof
                    of Work Form below. You are also required to enter your
                    Facebook Username or Name which you used to perform the task
                  </span>
                </div>
                <Link
                  isExternal
                  className='self-stretch h-9 p-2 bg-white justify-center items-center gap-1 inline-flex'
                >
                  <div className="grow shrink basis-0 text-black text-[12.83px] font-normal font-['Manrope']">
                    https://trendit-web.vercel.app/7839
                  </div>
                  <div className='justify-start items-center gap-2 flex'>
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      width='17'
                      height='16'
                      viewBox='0 0 17 16'
                      fill='none'
                    >
                      <path
                        d='M14.25 5.33333C14.25 5.60948 14.4739 5.83333 14.75 5.83333C15.0261 5.83333 15.25 5.60948 15.25 5.33333H14.25ZM11.4167 1.5C11.1405 1.5 10.9167 1.72386 10.9167 2C10.9167 2.27614 11.1405 2.5 11.4167 2.5V1.5ZM8.39645 7.64645C8.20118 7.84171 8.20118 8.15829 8.39645 8.35355C8.59171 8.54882 8.90829 8.54882 9.10355 8.35355L8.39645 7.64645ZM14.7137 2.182L14.2682 2.40899L14.2682 2.409L14.7137 2.182ZM14.568 2.03633L14.341 2.48183V2.48184L14.568 2.03633ZM8.75 3.83333C9.02614 3.83333 9.25 3.60948 9.25 3.33333C9.25 3.05719 9.02614 2.83333 8.75 2.83333V3.83333ZM13.9167 8C13.9167 7.72386 13.6928 7.5 13.4167 7.5C13.1405 7.5 12.9167 7.72386 12.9167 8H13.9167ZM4.20603 13.7094L4.43302 13.2638L4.20603 13.7094ZM3.04065 12.544L2.59515 12.771L3.04065 12.544ZM11.9606 13.7094L11.7336 13.2638L11.9606 13.7094ZM13.126 12.544L12.6805 12.317L13.126 12.544ZM3.04065 4.78936L2.59515 4.56236H2.59515L3.04065 4.78936ZM4.20603 3.62398L3.97903 3.17848L3.97903 3.17848L4.20603 3.62398ZM15.25 5.33333V2.53333H14.25V5.33333H15.25ZM14.2167 1.5H11.4167V2.5H14.2167V1.5ZM14.2988 1.74408L8.39645 7.64645L9.10355 8.35355L15.0059 2.45118L14.2988 1.74408ZM15.25 2.53333C15.25 2.44824 15.2504 2.35435 15.2438 2.27368C15.2367 2.18718 15.2192 2.07289 15.1592 1.95501L14.2682 2.409C14.2444 2.36242 14.2451 2.33045 14.2471 2.35512C14.2481 2.36715 14.249 2.38617 14.2495 2.41757C14.25 2.44895 14.25 2.48552 14.25 2.53333H15.25ZM14.2167 2.5C14.2645 2.5 14.3011 2.50001 14.3324 2.50051C14.3638 2.501 14.3829 2.5019 14.3949 2.50288C14.4195 2.5049 14.3876 2.50557 14.341 2.48183L14.795 1.59083C14.6771 1.53076 14.5628 1.51327 14.4763 1.5062C14.3956 1.49961 14.3018 1.5 14.2167 1.5V2.5ZM15.1592 1.95501C15.1192 1.87661 15.0674 1.80553 15.0059 1.74408L14.2988 2.45118C14.2865 2.4389 14.2762 2.42468 14.2682 2.40899L15.1592 1.95501ZM15.0059 1.74408C14.9445 1.68263 14.8734 1.63077 14.795 1.59083L14.341 2.48184C14.3253 2.47385 14.3111 2.46347 14.2988 2.45118L15.0059 1.74408ZM9.15 13.5H7.01667V14.5H9.15V13.5ZM3.25 9.73333V7.6H2.25V9.73333H3.25ZM7.01667 3.83333H8.75V2.83333H7.01667V3.83333ZM12.9167 8V9.73333H13.9167V8H12.9167ZM7.01667 13.5C6.26168 13.5 5.72551 13.4996 5.30592 13.4653C4.89217 13.4315 4.636 13.3673 4.43302 13.2638L3.97903 14.1549C4.34648 14.3421 4.7489 14.4232 5.22449 14.462C5.69425 14.5004 6.27818 14.5 7.01667 14.5V13.5ZM2.25 9.73333C2.25 10.4718 2.24961 11.0558 2.28799 11.5255C2.32685 12.0011 2.40792 12.4035 2.59515 12.771L3.48615 12.317C3.38273 12.114 3.31848 11.8578 3.28467 11.4441C3.25039 11.0245 3.25 10.4883 3.25 9.73333H2.25ZM4.43302 13.2638C4.02534 13.0561 3.69388 12.7247 3.48615 12.317L2.59515 12.771C2.89875 13.3668 3.38318 13.8513 3.97903 14.1549L4.43302 13.2638ZM9.15 14.5C9.88849 14.5 10.4724 14.5004 10.9422 14.462C11.4178 14.4232 11.8202 14.3421 12.1876 14.1549L11.7336 13.2638C11.5307 13.3673 11.2745 13.4315 10.8607 13.4653C10.4412 13.4996 9.90499 13.5 9.15 13.5V14.5ZM12.9167 9.73333C12.9167 10.4883 12.9163 11.0245 12.882 11.4441C12.8482 11.8578 12.7839 12.114 12.6805 12.317L13.5715 12.771C13.7587 12.4035 13.8398 12.0011 13.8787 11.5255C13.9171 11.0558 13.9167 10.4718 13.9167 9.73333H12.9167ZM12.1876 14.1549C12.7835 13.8513 13.2679 13.3668 13.5715 12.771L12.6805 12.317C12.4728 12.7247 12.1413 13.0561 11.7336 13.2638L12.1876 14.1549ZM3.25 7.6C3.25 6.84501 3.25039 6.30884 3.28467 5.88925C3.31848 5.4755 3.38273 5.21934 3.48615 5.01635L2.59515 4.56236C2.40792 4.92981 2.32685 5.33223 2.28799 5.80782C2.24961 6.27758 2.25 6.86151 2.25 7.6H3.25ZM7.01667 2.83333C6.27818 2.83333 5.69425 2.83294 5.22449 2.87133C4.7489 2.91018 4.34648 2.99125 3.97903 3.17848L4.43302 4.06949C4.636 3.96606 4.89217 3.90181 5.30592 3.868C5.72551 3.83372 6.26168 3.83333 7.01667 3.83333V2.83333ZM3.48615 5.01635C3.69388 4.60867 4.02534 4.27721 4.43302 4.06949L3.97903 3.17848C3.38318 3.48208 2.89875 3.96652 2.59515 4.56236L3.48615 5.01635Z'
                        fill='#CB29BE'
                      />
                    </svg>
                    <div className="text-fuchsia-600 text-sm font-medium font-['Manrope']">
                      Visit Link
                    </div>
                  </div>
                </Link>
                <div className='self-stretch p-3 bg-rose-100 justify-start items-start gap-[29px] inline-flex'>
                  <div className='grow shrink basis-0 justify-start items-center gap-2.5 flex'>
                    <div className="grow shrink basis-0 text-orange-600 text-xs font-normal font-['Manrope']">
                      You must NOT UNLIKE or UNFOLLOW the Facebook page after
                      you have like and followed the page. Your Hawkit account
                      will be suspended once you UNLIKE or UNFOLLOW the Facebook
                      Page.
                    </div>
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      width='21'
                      height='20'
                      viewBox='0 0 21 20'
                      fill='none'
                    >
                      <path
                        d='M10.748 13.3417V9.17507M10.748 6.67507V6.66673M4.36458 5.35227L9.9148 2.14785C10.4305 1.85013 11.0658 1.85013 11.5815 2.14785L17.1317 5.35227C17.6473 5.64999 17.965 6.2002 17.965 6.79564V13.2045C17.965 13.7999 17.6473 14.3501 17.1317 14.6479L11.5815 17.8523C11.0658 18.15 10.4305 18.15 9.9148 17.8523L4.36458 14.6479C3.84892 14.3501 3.53125 13.7999 3.53125 13.2045V6.79564C3.53125 6.2002 3.84892 5.64999 4.36458 5.35227Z'
                        stroke='#FF3D00'
                        strokeWidth='2'
                        strokeLinecap='round'
                      />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className='grow shrink basis-0 self-stretch p-3 bg-zinc-400 bg-opacity-30 rounded-lg flex-col justify-start items-center gap-10 inline-flex'>
            <div className='self-stretch py-6 flex-col justify-start items-center gap-3 flex'>
              <div className='self-stretch py-3 justify-start items-start gap-2 inline-flex'>
                <div className="grow shrink basis-0 text-center text-stone-900 text-2xl font-medium font-['Manrope']">
                  Upload proof
                </div>
              </div>
            </div>
            <div className=' flex-col justify-start items-center gap-8 flex'>
              <div className='w-[243px] opacity-50 bg-neutral-800 justify-center items-center inline-flex'>
                <div className='w-6 h-6 relative flex-col justify-start items-start flex' />
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  width='24'
                  height='24'
                  viewBox='0 0 24 24'
                  fill='none'
                >
                  <path
                    d='M12 4V20M20 12L4 12'
                    stroke='white'
                    strokeWidth='2'
                    strokeLinecap='round'
                  />
                </svg>
              </div>
              <div className='self-stretch flex-col justify-start items-start gap-3 flex'>
                <div className="self-stretch text-black text-xs font-semibold font-['Manrope']">
                  Please enter the name on your Facebook account that performed
                  this task
                </div>
                <Input
                  placeholder='Corehunter007'
                  size='sm'
                  className="grow self-stretch rounded-none gap-1 inline-flex shrink basis-0 text-black text-[12.83px] font-normal font-['Manrope']"
                />

                <div className='self-stretch justify-between items-center inline-flex'>
                  <div className='p-2 bg-fuchsia-400 rounded-md border border-violet-500 border-opacity-25 justify-center items-center gap-1 flex'>
                    <div className="text-center text-stone-900 text-[10px] font-medium font-['Manrope']">
                      Upload Proof
                    </div>
                  </div>
                  <div className='p-2 justify-center items-center gap-1 flex'>
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      width='19'
                      height='19'
                      viewBox='0 0 19 19'
                      fill='none'
                    >
                      <path
                        d='M15.25 5.83984L7.35355 13.7363C7.15829 13.9316 6.84171 13.9316 6.64645 13.7363L3.25 10.3398'
                        stroke='#CB29BE'
                        strokeLinecap='round'
                      />
                    </svg>
                    <div className="text-center text-fuchsia-600 text-[12.83px] font-bold font-['Manrope']">
                      Save
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className='self-stretch h-[43px] flex-col justify-start items-end gap-2 flex'>
          <div className='md:w-[290px] px-6 py-3.5 bg-emerald-200 rounded-[100px] justify-center items-center gap-2 inline-flex'>
            <div className="text-center text-black text-[12.83px] font-medium font-['Manrope']">
              Mark as Done
            </div>
          </div>
        </div>
        <div className='self-stretch p-3 justify-between items-end inline-flex'>
          <div className='flex-col justify-center items-start gap-3 inline-flex'>
            <div className="text-center text-black text-[10px] font-bold font-['Manrope']">
              You and 23 others
            </div>

            <AvatarGroup isBordered max={4}>
              <CustomAvatar src={usersImage} />
              <CustomAvatar src={usersImage} />
              <CustomAvatar src={usersImage} />
              <CustomAvatar src={usersImage} />
              <CustomAvatar src={usersImage} />
              <div className='relative'>
                {/* <div className='w-[42px] h-[42px] left-0 top-0 absolute bg-stone-900 rounded-[100px]' /> */}
                <div className="left-[14px] top-[17px] bg-stone-900 absolute text-center text-white text-[10px] font-bold font-['Manrope']">
                  23+
                </div>
              </div>
            </AvatarGroup>
          </div>
          <div className='justify-start items-center gap-[7px] flex'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              width='21'
              height='20'
              viewBox='0 0 21 20'
              fill='none'
            >
              <path
                d='M10.748 13.3417V9.17507M10.748 6.67507V6.66673M4.36458 5.35227L9.9148 2.14785C10.4305 1.85013 11.0658 1.85013 11.5815 2.14785L17.1317 5.35227C17.6473 5.64999 17.965 6.2002 17.965 6.79564V13.2045C17.965 13.7999 17.6473 14.3501 17.1317 14.6479L11.5815 17.8523C11.0658 18.15 10.4305 18.15 9.9148 17.8523L4.36458 14.6479C3.84892 14.3501 3.53125 13.7999 3.53125 13.2045V6.79564C3.53125 6.2002 3.84892 5.64999 4.36458 5.35227Z'
                stroke='#FF3D00'
                strokeWidth='2'
                strokeLinecap='round'
              />
            </svg>
            <div className="text-center text-orange-600 text-sm font-medium font-['Manrope']">
              Report Task
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
